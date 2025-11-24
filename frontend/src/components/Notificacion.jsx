import React from "react";

// Componente individual de notificación
const Notificacion = ({ titulo, mensaje, tiempo, tipoAccion }) => {
return (
<div style={{marginTop: 16, padding: 16, background: tipoAccion ? '#EEF7EC' : '#FFFFFF', borderRadius: 8}}>
<div style={{fontWeight: 500}}>{titulo}</div> <div>{mensaje}</div>
<div style={{color: '#7E8081', marginTop: 4}}>{tiempo}</div>
{tipoAccion && (
<button style={{marginTop: 8, padding: 8, background: '#0F0F0F', color: 'white', borderRadius: 8}}>
Únase a la acción </button>
)} </div>
);
};

export default Notificacion;
