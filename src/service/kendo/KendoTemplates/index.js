const carouselTemplate = `
<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
        # imagenes.map((i, index) => { #
        #if(index === 0){#
         <li data-target="\\#carouselExampleIndicators" data-slide-to="#= index #" class="active"></li>
      #}else{#
         <li data-target="\\#carouselExampleIndicators" data-slide-to="#= index #"></li>
      #}#
        # }) #
    </ol>
    <div class="carousel-inner">
        # imagenes.map((i, index) => { #
        #if(index === 0){#
   <div class="carousel-item active">
    <img class="d-block w-100" src="#= i #" alt="First slide" style="height: 600px; width: 700px;">
    <div class="carousel-caption d-none d-md-block">
      <div class="row">
        <div class="col-sm">
           Nro Tarjeta: #= nroTarjeta #
        </div>
        <div class="col-sm">
           Nro Lote: #= idLote #
        </div>
        <div class="col-sm">
            Fecha Ingreso: #= fechaIngreso #
        </div>
        <div class="col-sm">
            Producto: #= producto #
        </div>
    </div>
    </div>
  </div>
  #}else{#
   <div class="carousel-item">
    <img class="d-block w-100" src="#= i #" alt="First slide" style="height: 600px; width: 700px;">
    <div class="carousel-caption d-none d-md-block">
      <div class="row">
        <div class="col-sm">
           Nro Tarjeta: #= nroTarjeta #
        </div>
        <div class="col-sm">
           Nro Lote: #= idLote #
        </div>
        <div class="col-sm">
            Fecha Ingreso: #= fechaIngreso #
        </div>
        <div class="col-sm">
            Producto: #= producto #
        </div>
    </div>
    </div>
  </div>
   #}#
        # }) #
    </div>
    <a class="carousel-control-prev" href="\\#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="\\#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>
`;

export {
    carouselTemplate
}
