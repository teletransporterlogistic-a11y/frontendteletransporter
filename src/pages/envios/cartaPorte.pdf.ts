<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />

<style>
  @page {
    size: 5.5in 8.5in;
    margin: 0;
  }

  body {
    width: 5.5in;
    height: 8.5in;
    padding: 18px 22px;
    font-family: Arial, sans-serif;
    font-size: 11px;
  }

  .qr {
    text-align: center;
    margin-bottom: 8px;
  }

  .qr img {
    width: 120px;
    height: 120px;
  }

  h1 {
    text-align: center;
    font-size: 15px;
    margin: 0;
    font-weight: bold;
  }

  .sub {
    text-align: center;
    font-size: 10px;
    margin-bottom: 12px;
  }

  .section-title {
    font-weight: bold;
    margin-top: 8px;
    border-bottom: 1px solid #000;
    padding-bottom: 2px;
    font-size: 11px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-top: 4px;
  }

  .col {
    width: 48%;
  }

  .box {
    border: 1px solid #000;
    padding: 5px;
    margin-top: 4px;
  }

  .costos-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 6px;
  }

  .costos-table td {
    padding: 3px;
    border-bottom: 1px solid #ccc;
  }

  .right {
    text-align: right;
  }
</style>
</head>

<body>

  <!-- QR ARRIBA -->
  <div class="qr">
    <img src="{{qrBase64}}">
    <div><strong>{{guia}}</strong></div>
  </div>

  <h1>TELETRANSPORTER</h1>
  <div class="sub">
    Laguna de San Ildefonso No. 150, Col. Lago 1, Morelia Mich. C.P. 58118<br>
    Tel: 4437973371 — www.teletransporter.mx
  </div>

  <!-- REMITENTE / DESTINATARIO -->
  <div class="row">
    <div class="col">
      <div class="section-title">REMITENTE</div>
      <div class="box">
        <div><strong>{{remitenteNombre}}</strong></div>
        <div>{{remitenteCalle}} {{remitenteNumero}}</div>
        <div>{{remitenteColonia}}</div>
        <div>{{remitenteCiudad}}, {{remitenteEstado}}, México</div>
        <div>C.P. {{remitenteCP}}</div>
        {{#if remitenteRFC}}<div>RFC: {{remitenteRFC}}</div>{{/if}}
        {{#if remitenteCorreo}}<div>Correo: {{remitenteCorreo}}</div>{{/if}}
      </div>
    </div>

    <div class="col">
      <div class="section-title">DESTINATARIO</div>
      <div class="box">
        <div><strong>{{destinatarioNombre}}</strong></div>
        <div>{{destinatarioCalle}} {{destinatarioNumero}}</div>
        <div>{{destinatarioColonia}}</div>
        <div>{{destinatarioCiudad}}, {{destinatarioEstado}}, México</div>
        <div>C.P. {{destinatarioCP}}</div>
        {{#if destinatarioRFC}}<div>RFC: {{destinatarioRFC}}</div>{{/if}}
      </div>
    </div>
  </div>

  <!-- DATOS DEL ENVÍO -->
  <div class="section-title">DATOS DEL ENVÍO</div>
  <div class="box">
    <div><strong>Guía:</strong> {{guia}}</div>
    <div><strong>Fecha:</strong> {{fecha}}</div>
    <div><strong>Cantidad:</strong> {{cantidadPaquetes}}</div>
    <div><strong>Peso:</strong> {{peso}} kg</div>
    <div><strong>Contenido:</strong> {{descripcionContenido}}</div>
  </div>

  <!-- COSTOS -->
  <div class="section-title">COSTOS</div>
  <table class="costos-table">
    <tr>
      <td>Flete</td>
      <td class="right">$ {{costoBase}}</td>
    </tr>
    <tr>
      <td>Servicios</td>
      <td class="right">$ {{costoServicios}}</td>
    </tr>
    <tr>
      <td>Costo Interno</td>
      <td class="right">$ {{costoInterno}}</td>
    </tr>
    <tr>
      <td>Subtotal</td>
      <td class="right">$ {{costoTotal}}</td>
    </tr>
    <tr>
      <td>IVA 16%</td>
      <td class="right">$ {{iva}}</td>
    </tr>
    <tr>
      <td><strong>Total</strong></td>
      <td class="right"><strong>$ {{total}}</strong></td>
    </tr>
  </table>

</body>
</html>
