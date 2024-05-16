/*Poner propiedades de la camara, ancho 350, alto 300, formato de imagen png, png calidad 90.  */
  Webcam.set({
    width: 350,
    height:300,
    image_format:"png",
    png_quality: 90
  });

/*Almacenar en la variable camara  el elemento HTML que queremos mostrar al llamar el documento 
y seleccionar el id de la vista en vivo de la cámara*/
  camera = document.getElementById("camera");

Webcam.attach( '#camera' );

/*Crear función tomar_imagenInstantanea() */     
function take_snapshot()
{
    /*Usar data_uri para mostrar la imágen*/
    Webcam.snap(function(data_uri) {
    /*Actualizar el resultado llamando al documento y seleccionando el id donde debe aparecer el resultado */
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
/*Imprimir en la consola la 'ml5 version:' */
  console.log('ml5 version:', ml5.version);

  /*Poner el enlace del modelo y agregar al final model.json*/
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/2Isb14I8s/model.json",modelLoaded);

  function modelLoaded() {
    /*Imprimir el mensaje 'Model Loaded!'  */
    console.log('Model Loaded!');
  }
      
  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }


function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("result_object_name").innerHTML = results[0].label;
    document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
  }
}