import React, { useState } from "react";
import Notificacion from "./Notificacion";

const Notificaciones = ({ notificaciones }) => {
const [isOpen, setIsOpen] = useState(false);

return ( <div>
<button
onClick={() => setIsOpen(!isOpen)}
className="px-4 py-2 bg-gray-200 rounded-lg"
>
Notificaciones </button>

  {isOpen && (
    <div style={{width: 342, height: 629, position: 'absolute', right: 0, top: 80, background: 'white', borderRadius: 8, border: '1px solid #E3E5E6', overflowY: 'auto', padding: 16}}>
      <div style={{fontWeight: 600, fontSize: 20, marginBottom: 16}}>Notificaciones</div>
      <div style={{color: '#54B046', cursor: 'pointer', position: 'absolute', right: 16, top: 16}}>Ver todo</div>

      {notificaciones.map((notif, index) => (
        <Notificacion
          key={index}
          titulo={notif.titulo}
          mensaje={notif.mensaje}
          tiempo={notif.tiempo}
          tipoAccion={notif.tipoAccion}
        />
      ))}
    </div>
  )}
</div>

);
};

export default Notificaciones;
