import {useEffect, useRef, useState} from "react";

export const useStateVideo = () =>{

    //Estados que nos permite modificar y obtener del componente de video, mas info en documentacion de React Player
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

    const player = useRef(null)

    const uploadUrl = (urlData) => {
        setUrl(urlData)
    }

    const handlePlayPause = () => {
        setPlaying( !playing)
    }

    const handleVolume = (e) =>{
        setVolume(parseFloat(e.target.value))
    }

    const handlePlaybackRateChange = (e) => {
        setPlaybackRate(e)
    }

    const handleSeekMouseDown = () => {
        setSeeking(true)
    }

    const handleSeekMouseUp = (e) => {
        setSeeking(false)
        player.current.seekTo(parseFloat(e.target.value))
    }

    const handleSeekChange = (e) => {
        setPlayed(parseFloat(e.target.value))
    }

    const handleProgress = ({played, loaded}) =>{
        console.log("yes ",played)
        if (!seeking){
            setPlayed(played)
            setLoaded(loaded)
        }
    }

    const handleEnded = () => {

    }

    const handleDuration = (duration) => {
        setDuration(duration)

    }

    const ref = (players) => {
        player.current = players
    }

    return{
        url, pip, playing, controls, light, volume, muted, played, loaded, duration, playbackRate, loop,
        handlePlayPause, handleVolume, handlePlaybackRateChange, handleSeekMouseDown, handleSeekMouseUp,
        handleSeekChange, handleProgress, handleDuration, uploadUrl, ref
    }


}