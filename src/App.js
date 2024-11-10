import Navegation from "./components/Navegation";
import Logo from "./components/Logo/Logo";
// import Clarifai from 'clarifai'
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";
import ParticlesBg from "particles-bg";
import React, { Component } from "react";

///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////////////////////////////////////////////////
// const app = new Clarifai.apiKeya.App({
//   apiKey: 'f4aa95bf34514a49b3015b7d10086066'
// })
// const returnClarifaiJSONRequestOptions = (imageUrl) => {
//   // Your PAT (Personal Access Token) can be found in the Account's Security section
// // f4aa95bf34514a49b3015b7d10086066
//   // para que la aplicacion funcione sin necesidad de importar la libreria de clarifai y pase desapercibido como nuestra lo unico que debemos hacer es quitar el import clarifai de la libreria
//   const PAT = "2c00e4f5014a4148a01bef243856c702";
//   // Specify the correct user_id/app_id pairings
//   // Since you're making inferences outside your app's scope
//   const USER_ID = "jpdeveloper";
//   const APP_ID = "face-recognition-app";
//   // Change these to whatever model and image URL you want to use
//   // const MODEL_ID = 'face-detection';
//   const IMAGE_URL = imageUrl;

//   const raw = JSON.stringify({
//     user_app_id: {
//       user_id: USER_ID,
//       app_id: APP_ID,
//     },
//     inputs: [
//       {
//         data: {
//           image: {
//             url: IMAGE_URL,
//             // "base64": IMAGE_BYTES_STRING
//           },
//         },
//       },
//     ],
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       Authorization: "Key " + PAT,
//     },
//     body: raw,
//   };
//   return requestOptions;
// };
const initialState={
  input: "",
  imageUrl: "",
  box: "",
  route: "signin",
  isSignedIn: false,
  user:{
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: '',
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
// Para probar si manda los usuarios
// componentDidMount() {
//     fetch('http://localhost:3000/')
//       .then(response => response.json())
//       .then(console.log);
//     // este console.log es lo mismo que decir data => console.log(data)
//   }
loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    // console.log('click')
    this.setState({ imageUrl: this.state.input });
    // const MODEL_ID = "face-detection";
    fetch('https://smart-brain-front-lmzk.onrender.com/imageurl', {            
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    // To use image bytes, assign its variable
    // const IMAGE_BYTES_STRING = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAoACgDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAYDBQcE/8QAMBAAAQMDAwMDAgQHAAAAAAAAAQIDBAAFEQYSIQcTMTJBURRhCBYikSNScXKhsdH/xAAZAQACAwEAAAAAAAAAAAAAAAAFBgIDBAf/xAAtEQABAwMBBgQHAQAAAAAAAAABAgMRAAQhMQUSE0FRYQaBocEUFiJCcrHR8P/aAAwDAQACEQMRAD8A3+RYY1unSYzCS0ttZUkAgktn0q5yT7jPyDUC4wdGwycH5U2Kt9ZQ7VI1qw5PkvQy3CSVPpf7aQjuKyFH25xzn3pHn3TVNy01Hl2hyy6YdkSpKsS9sl/6RlI3rRu3dxWd6spwnAGPIJTfl925fcLaoSDHXvyo6i9SlCQrU9wKln3OyWiaDN1RAbW3kKbSd7gPtwMkH/tTWy9afuy1iPfnXMAblITwkE4yf08cn3pSbYt1uts24XH6fUbiLAuY1MWyGkLEmUW0rcCRvUpQ5CtwKQCPgi4S1ZbDe4sd9NntDEe79m3uOBLTr0IR9jzodSMqUpTu9JJ8owD7UTT4ZCfv9PbP7860m+s+HBSrejWRuz2kAxoesGYxTW/Zlpkwo1vkuSly3UgKWQUhHJUvIHsAaKTemF8XE6sWmxyZkiaZrMh1jv8ArQNpUVqB8FW0njHqx4zRVVhsph1KlKk5xQ+7uHmikaSJrQerMByet2IwvtuTLa4xv2k7Rk84H9x/esHv92d01boenLXGcuiWrFIhLlpbcaQ2/JdK3VJCkAq2pAR7Zz7YxWudY9fxNIdQbNGkR5TyX4aisNNpUMFZAzkj4NK0jq9ZpbLr0PSlzkhrlZDaQlP3P8Q4/ap3F87bPucJEkx/hHv60b2TYXLrKN5sramYECSQRk9M6c6zmJ+eb5Hi22M7cnWGIQgFLbX0zSo4PDa1YBcTgDyMjJ/qbGPabH08SJt1Uzc9QqRliGg5QySPKvgc+TyfYDmmTUWpNYz7ctxoQdPQshCktupckDJUPUcJT6DwMq8YyaQ9VL0pCS8zapcq4SVOBZmPDO8/cnknlWcDBwn4NYnPjLkQ+qE9OtOVlYpeVHDCEkkkJyT+SuQzy5Y0ru6Ez511/Efa5s1fdkOtyVurIxgdlQAA9gOKKPwolU7remU5hCGYEgo38KUv9I/0TRTDYJCWQBSF4rIN/CRgAR0iTpVD1j1g/qDqJcJqlKcjB9bcda142MpOEJAzgeMnjyTSyze5KEuNRpDoDvC0oe4X9iAeaKKFK+oya6fbOqYbDTeEiAPKpHdS3gBLYc7RQkp3ApQog+cq8nwPJrljzxnPZbUfnugn/NFFRgEVch9xKsH0H8pg6e3x3T3UC1ajaZITGkJLoS4MKbOUrzz/ACKVRRRVzVwtoQmhG1NkWu0HuI+JI8u/Kv/Z';

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    // fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",returnClarifaiJSONRequestOptions(this.state.input))
    //         .then(response => response.json())
    //         .then(result => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
    //         .catch(error => console.log('error', error));

    // fetch(
    //   "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
    //   returnClarifaiJSONRequestOptions(this.state.input)
    // )
    //   .then((response) => response.json())
    //   .then((result) => 
    //     this.displayFaceBox(this.calculateFaceLocation(result))
    //   );

    // app.post('/imageurl', (req,res) =>{handleApiCall(req,res)});
    // app.put('/image', (req,res) =>{handleImage(req,res,db)});
    // fetch(
    //   "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
    //   returnClarifaiJSONRequestOptions(this.state.input)
    // )
        .then((response) => response.json())
        .then((result) => {
          if (result){
            fetch('https://smart-brain-front-lmzk.onrender.com/image', {            
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                 this.setState(Object.assign(this.state.user, { entries: count}))
         })
        //  error handling  se llama esto 
        //  antes estaba asi 
        // .catch(error =>console.log('Error',error));
         .catch(console.log);
          }
        this.displayFaceBox(this.calculateFaceLocation(result))
  });
    
  // fetch("https://api.clarifai.com/v2/models"+ MODEL_ID +"/outputs", returnClarifaiJSONRequestOptions(this.state.input))
  // .then(response => response.json())
  // .then(result => {
  //   if (result) {
  //     fetch('http://localhost:3000/image', {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         id: this.state.user.id
  //       })
  //     })
  //     .then(response => response.json())
  //     .then(count => {
  //       this.setState(Object.assign(this.state.user, { entries: count }));
  //     })
  //     .catch(error => console.log('Error en la solicitud PUT:', error));
  //   }
  //   this.displayFaceBox(this.calculateFaceLocation(result));
  // })
//       Failed to load resource: net::ERR_FAILED
// Uncaught (in promise) TypeError: Failed to fetch


    //   const regions = result.outputs[0].data.regions;

    //   regions.forEach((region) => {
    //     // Accessing and rounding the bounding box values
    //     const boundingBox = region.region_info.bounding_box;
    //     const topRow = boundingBox.top_row.toFixed(3);
    //     const leftCol = boundingBox.left_col.toFixed(3);
    //     const bottomRow = boundingBox.bottom_row.toFixed(3);
    //     const rightCol = boundingBox.right_col.toFixed(3);

    //     region.data.concepts.forEach((concept) => {
    //       // Accessing and rounding the concept value
    //       const name = concept.name;
    //       const value = concept.value.toFixed(4);

    //       console.log(
    //         `${name}: ${value} TopRox: ${topRow}, leftCol: ${leftCol}, bottomRow ${bottomRow}, righCol: ${rightCol}`
    //       );
    //     });
    //   });
    // })
    // .catch((error) => console.log("error", error));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };
  // onRouteChange = (route) => {
  //   this.setState({route: route})
  // }
  render() {
    const { isSignedIn, imageUrl, box, route } = this.state;
    return (
      <div className="App">
        {/* Primero creamos los componentes que vamos a necesitar crear */}
        {/*  puedes colocar num={100} para colocar mas particles */}
        <ParticlesBg
          className="Particles"
          color="#4D2960"
          type="cobweb"
          bg={true}
        />
        <Navegation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank 
            name={this.state.user.name}
            entries={this.state.user.entries} 
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
