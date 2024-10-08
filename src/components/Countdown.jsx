import React, { useState, useEffect } from "react";

export default function Countdown() {

    const [days, setDays] = useState('00');
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');

    useEffect(() => {
        // Definir la fecha del lanzamiento
        var launchDate = new Date('June 23, 2024 00:00:00').getTime();
    
        // Actualizar el contador cada segundo
        var intervalId = setInterval(() => {
            // Obtener la fecha y hora actual
            var now = new Date().getTime();
    
            // Calcular la distancia entre la fecha actual y la fecha del lanzamiento
            var distance = launchDate - now;
    
            // Calcular los días, horas, minutos y segundos restantes
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
            // Actualizar el estado con los nuevos valores del contador
            setDays(days < 10 ? "0" + days : days);
            setHours(hours < 10 ? "0" + hours : hours);
            setMinutes(minutes < 10 ? "0" + minutes : minutes);
            setSeconds(seconds < 10 ? "0" + seconds : seconds);

            // Si la cuenta regresiva termina, mostrar un mensaje
            if (distance < 0) {
                clearInterval(intervalId);
            }
        }, 1000);

        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div id="countdown">
                <div className="cuadro">
                    <div className="countdown-item" id="days">{days}</div>
                    <div className="countdown-label">DIAS</div>
                </div>
                <div className="cuadro">
                    <div className="countdown-item" id="hours">{hours}</div>
                    <div className="countdown-label">HORAS</div>
                </div>
                <div className="cuadro">
                    <div className="countdown-item" id="minutes">{minutes}</div>
                    <div className="countdown-label">MINUTOS</div>
                </div>
                <div className="cuadro">
                    <div className="countdown-item" id="seconds">{seconds}</div>
                    <div className="countdown-label">SEGUNDOS</div>
                </div>
            </div>
        </>
    );
}
