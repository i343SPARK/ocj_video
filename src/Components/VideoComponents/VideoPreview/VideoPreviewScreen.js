import {useStateVideo} from "../Hooks/useStateVideo";
import ReactPlayer from "react-player";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Seconds} from "../VideoTools/Seconds";

export const VideoPreviewScreen = () =>{

    /*
        Hook personalizada de useStateVideo
    */
    const {
        url,
        pip,
        playing,
        controls,
        playbackRate,
        volume,
        duration,
        played,
        handlePlayPause,
        handleVolume,
        handlePlaybackRateChange,
        handleSeekMouseDown,
        handleSeekMouseUp,
        handleSeekChange,
        handleProgress,
        handleDuration,
        uploadUrl,
        ref
    } = useStateVideo()

    const [playeStop, setPlayStop] = useState(false)
    const [velocity1, setVelocity1] = useState(true)
    const [velocity2, setVelocity2] = useState(false)
    const [velocity3, setVelocity3] = useState(false)


    /*
        Funcion para cambiar el estado de video, y el icono de pausa y reproduccion
     */
    const switchStateVideo = () =>{
        setPlayStop(!playeStop)
        handlePlayPause()
    }

    /*
        Funcion para cambiar las velocidades del video, teniendo como primer click el cambio a una segunda velocidad,
        luego a una tercera, y se reinicia, iniciando en 1.0
     */
    const switchVelocity1 = () =>{
        setVelocity1(!velocity1)
        setVelocity2(!velocity2)
        handlePlaybackRateChange(2.0)
    }

    const switchVelocity2 = () =>{
        setVelocity2(!velocity2)
        setVelocity3(!velocity3)
        handlePlaybackRateChange(3.0)
    }

    const switchVelocity3 = () =>{
        setVelocity3(!velocity3)
        setVelocity1(!velocity1)
        handlePlaybackRateChange(1.0)
    }


    /*
        Actualiza el video de edit automaticamente, llamando a la funcion proveniente de useStateVideo
     */
    useEffect(() => {
        fetch("http://localhost:8000/video-data").then((res) => res.json()).then((data) => {
            uploadUrl(data[0].url)
        })
    }, [])

    return(
        <>
            <section className={"preview-section"}>
                <div className={"div-back-tab"}>
                    <Link className={"back-button"} to={"/edit-video"}><span className={"arrow-symbol"}></span>Volver</Link>
                </div>
                <div className={"video-edit-div"}>
                    <article className={"video-edit--content"}>
                        <div className={"video-size"}>
                            <ReactPlayer
                                ref={ref}
                                className='react-player'
                                width='100%'
                                height='100%'
                                url={url}
                                pip={pip}
                                playing={playing}
                                controls={controls}
                                playbackRate={playbackRate}
                                volume={volume}
                                onDuration={handleDuration}
                                onError={e => console.log('onError', e)}
                                onProgress={handleProgress}
                            />
                        </div>
                        <div className={"bar-video-controls"}>
                            <div className={"left-div-options"}>
                                <button onClick={switchStateVideo} className={"play-video-button"}>
                                    <span className={playeStop ? "isPlaySpan" : "isStopSpan"}></span>
                                </button>
                                <button className={"back-video-button"}>Anterior</button>
                                <button className={"next-video-button"}>Siguiente</button>
                                <input type={"range"} min={0} max={1} step="any" value={volume} onChange={handleVolume}/>
                            </div>
                            <span className={"velocity-container"}>
                        <button className={velocity1 ? "velocity-button--true" : "velocity-button--false"}
                                onClick={switchVelocity1}
                        >
                            x1
                        </button>
                        <button className={velocity2 ? "velocity-button--true" : "velocity-button--false"}
                                onClick={switchVelocity2}
                        >
                            x2
                        </button>
                        <button className={velocity3 ? "velocity-button--true" : "velocity-button--false"}
                                onClick={switchVelocity3}
                        >
                            x3
                        </button>
                    </span>
                            <div className={"right-div-options"}>
                                <Seconds className={"seconds-display"} seconds={duration * played}/>
                            </div>
                        </div>
                    </article>
                </div>
                <div className={"bar-video-content"}>
                    <input className={"seek-bar"}
                           type='range' min={0} max={0.999999} step='any'
                           value={played}
                           onMouseDown={handleSeekMouseDown}
                           onChange={handleSeekChange}
                           onMouseUp={handleSeekMouseUp}
                    />
                </div>
                <div className={"edit-next-content"}>
                    <Link className={"edit-button"} to={"/edit-video"}>Subir</Link>
                </div>
            </section>
        </>
    )
}