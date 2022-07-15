import { useRef, useState} from "react";

export const useStateVideo = () =>{


    /*
        Estados que nos permite modificar y obtener del componente de video, mas info en documentacion de React Player
    */
    const [url, setUrl] = useState("")
    const [pip, setPip] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [controls, setControls] = useState(false)
    const [light, setLight] = useState(false)
    const [volume, setVolume] = useState(0.3)
    const [muted, setMuted] = useState(false)
    const [played, setPlayed] = useState(0)
    const [loaded, setLoaded] = useState(0)
    const [duration, setDuration] = useState(0)
    const [playbackRate, setPlaybackRate] = useState(1.0)
    const [loop, setLoop] = useState(false)
    const [seeking, setSeeking] = useState(false)

    /*
        Creamos una hook tipo useRef destinada para uso de ref
    */
    const player = useRef(null)

    /*
        Funcion que nos da la posibilidad de guardar y poner el url dado desde VideoInput y VideoEdit
    */
    const uploadUrl = (urlData) => {
        setUrl(urlData)
    }

    /*
        Funcion que cambia el estado de reproduccion del video
    */
    const handlePlayPause = () => {
        setPlaying( !playing)
    }

    /*
        Funcion que permite manipular el volumen del video
    */
    const handleVolume = (e) =>{
        setVolume(parseFloat(e.target.value))
    }


    /*
        Funcion que permite cambiar y manipular el video, usa una variable tipo float
    */
    const handlePlaybackRateChange = (e) => {
        setPlaybackRate(e)
    }


    /*
        Funcion que permite saber si el mouse esta haciendo click para poder modificar HandleProgrees
    */
    const handleSeekMouseDown = () => {
        setSeeking(true)
    }

    /*
        Funcion que permite saber si el mouse no esta haciendo click para poder modificar HandleProgrees
    */
    const handleSeekMouseUp = (e) => {
        setSeeking(false)
        player.current.seekTo(parseFloat(e.target.value))
    }

    /*
        Funcion que permite podificar el tiempo del video con relacion al input
    */
    const handleSeekChange = (e) => {
        setPlayed(parseFloat(e.target.value))
    }

    /*
        Funcion que actualiza el estado del video, siendo variables como played para poder modificar el input
    */
    const handleProgress = ({played, loaded}) =>{
        console.log("yes ",played)
        if (!seeking){
            setPlayed(played)
            setLoaded(loaded)
        }
    }

    /*
        Funcion que obtiene y se acciona cuando el video finaliza
    */
    const handleEnded = () => {

    }

    /*
        Funcion que obtiene y guarda la duracion del video
    */
    const handleDuration = (duration) => {
        setDuration(duration)

    }

    /*
        Funcion que obtiene y actualiza nuestra referencia para el video
    */
    const ref = (players) => {
        player.current = players
    }

    return{
        url, pip, playing, controls, light, volume, muted, played, loaded, duration, playbackRate, loop,
        handlePlayPause, handleVolume, handlePlaybackRateChange, handleSeekMouseDown, handleSeekMouseUp,
        handleSeekChange, handleProgress, handleDuration, uploadUrl, ref
    }


}