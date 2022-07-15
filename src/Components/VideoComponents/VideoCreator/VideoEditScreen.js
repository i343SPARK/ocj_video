import {useStateVideo} from "../Hooks/useStateVideo";
import ReactPlayer from "react-player";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Seconds} from "../VideoTools/Seconds";
import {OpenQuestion} from "./TypeQuestionMaker/OpenQuestion";
import {MultipleOption} from "./TypeQuestionMaker/MultipleOption";
import {TrueFalse} from "./TypeQuestionMaker/TrueFalse";


export const VideoEditScreen = () =>{

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
        handleSeekMouseDown,
        handleSeekMouseUp,
        handleSeekChange,
        handleProgress,
        handleDuration,
        uploadUrl,
        ref
    } = useStateVideo()

    const [playeStop, setPlayStop] = useState(false)
    const [screen1, setScreen1] = useState(false)
    const [screen2, setScreen2] = useState(false)
    const [screen3, setScreen3] = useState(false)


    /*
        Funcion para cambiar el estado de video, y el icono de pausa y reproduccion
     */
    const switchStateVideo = () =>{
        setPlayStop(!playeStop)
        handlePlayPause()
    }

    const displayOptionQuestion1 = () =>{
        setScreen1(!screen1)
        setScreen2(false)
        setScreen3(false)
    }

    const displayOptionQuestion2 = () =>{
        setScreen2(!screen2)
        setScreen3(false)
        setScreen1(false)
    }

    const displayOptionQuestion3 = () =>{
        setScreen3(!screen3)
        setScreen1(false)
        setScreen2(false)
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
        <section className={"edit-section"}>
            <div className={"div-back-tab"}>
                <Link className={"back-button"} to={"/"}><span className={"arrow-symbol"}></span>Volver</Link>
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
                            onError={e => console.log('onError', e)}
                            onProgress={handleProgress}
                            onDuration={handleDuration}
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
                        <div className={"right-div-options"}>
                            <Seconds className={"seconds-display"} seconds={duration * played}/>
                        </div>
                    </div>
                </article>
                <article className={"question-edit--content"}>
                    <div className={"question-display-option"}>
                        <OpenQuestion seconds={duration * played} display={screen1}/>
                        <MultipleOption seconds={duration * played} display={screen2}/>
                        <TrueFalse seconds={duration * played} display={screen3}/>
                    </div>
                    <div className={"bar-question-select"}>
                        <button onClick={displayOptionQuestion1} className={screen1 ? "question-button-on" : "question-button-off"}>
                            <span className={"orange-option"}></span>Pregunta Abierta
                        </button>
                        <button onClick={displayOptionQuestion2} className={screen2 ? "question-button-on" : "question-button-off"}>
                            <span className={"blue-option"}></span>Opcion Multiple
                        </button>
                        <button onClick={displayOptionQuestion3} className={screen3 ? "question-button-on" : "question-button-off"}>
                            <span className={"green-option"}></span>Falso / Verdadero
                        </button>
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
                <Link className={"edit-button"} to={"/preview-video"}>Siguiente</Link>
            </div>
            </section>
        </>
    )
}