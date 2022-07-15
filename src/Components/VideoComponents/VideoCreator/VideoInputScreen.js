import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export const VideoInputScreen = () =>{

    //Hook para obtener los datos del Input donde se escribe la url
    const [inputUrl, setInputUrl] = useState("")

    const updateHookInput = (data) =>{
        setInputUrl( data.target.value)
    }

    //Funcion que actualiza el hook de InputUrl, para el almacenamiento temporal de este
    //Funcion que obtiene y crea la dependencia de la base de datos relacionada con el video a usar
    const createDBUrl = () =>{
        axios.post("http://localhost:8000/video-data", {
            url: inputUrl
        }).then(res => console.log(res.data)).catch(err => console.log(err))
    }

    //Elimina el link del video en caso de que el usuario regrese
    useEffect(() => {
        axios.delete("http://localhost:8000/video-data/1").then(res => console.log(res.data)).catch(err => console.log(err))
    }, [])

    return(
        <>
            <section className={"input-section"}>
                <article className={"input-article"}>
                    <div className={"input-div"}>
                        <input type={"url"}
                               className={"input-video"}
                               placeholder={"Url del video"}
                               onChange={updateHookInput}
                        />
                    </div>
                    <div className={"input-button-div"}>
                        <Link className={"input-button"} onClick={createDBUrl} to={"/edit-video"}>Siguiente</Link>
                    </div>
                </article>
            </section>
        </>
    )
}