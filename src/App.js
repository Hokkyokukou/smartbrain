import './App.css';
import React, { Component } from 'react';

//Components
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

//Libraries
import ParticlesBg from 'particles-bg';
// import Clarifai from 'clarifai';

//old way
// const app = new Clarifai.App({
//     apiKey: '2d0723e917324cba87129d2f2f10f4b1',
// });

const returnClarifaiRequestOptions = (imageUrl) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '7623b833aa2b48a1b0424d30dd6cc4a6';
    const USER_ID = 'tx3c4w2ynkgs';
    const APP_ID = 'face-recognition-brain';
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
        user_app_id: {
            user_id: USER_ID,
            app_id: APP_ID,
        },
        inputs: [
            {
                data: {
                    image: {
                        url: IMAGE_URL,
                    },
                },
            },
        ],
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: 'Key ' + PAT,
        },
        body: raw,
    };

    return requestOptions;
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: '',
            },
        };
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined,
            },
        });
    };

    calculateFaceLocation = (data) => {
        const regions = data.outputs[0].data.regions[0];
        const image = document.getElementById('inputimage');
        const imageWidth = image.width;
        const imageHeight = image.height;

        // Accessing and rounding the bounding box values
        const boundingBox = regions.region_info.bounding_box;

        // Check values
        // console.log('Top Row:', boundingBox.top_row);
        // console.log('Left Col:', boundingBox.left_col);
        // console.log('Bottom Row:', boundingBox.bottom_row);
        // console.log('Right Col:', boundingBox.right_col);

        //Calculate faces
        const topRow = boundingBox.top_row * imageHeight;
        const leftCol = boundingBox.left_col * imageWidth;
        const bottomRow = imageHeight - boundingBox.bottom_row * imageHeight;
        const rightCol = imageWidth - boundingBox.right_col * imageWidth;

        return {
            topRow: topRow,
            leftCol: leftCol,
            bottomRow: bottomRow,
            rightCol: rightCol,
        };
    };

    displayFaceBox = (box) => {
        // console.log(box);
        this.setState({ box: box });
    };

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    };

    onPictureSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        //app.models.predict('face-detection', this.state.input)
        fetch(
            'https://api.clarifai.com/v2/models/' +
                'face-detection' +
                '/outputs',
            returnClarifaiRequestOptions(this.state.input)
        )
            .then((response) => response.json())
            .then((response) => {
                // console.log(result);
                if (response) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: this.state.id,
                        }),
                    })
                        .then((response) => response.json())
                        .then((count) => {
                            this.setState(
                                Object.assign(this.state.user, {
                                    entries: count,
                                })
                            );
                        });
                }
                this.displayFaceBox(this.calculateFaceLocation(response));
            });
    };

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({ isSignedIn: false });
        } else if (route === 'home') {
            this.setState({ isSignedIn: true });
        }
        this.setState({ route: route });
    };

    render() {
        const { isSignedIn, imageUrl, route, box } = this.state;
        return (
            <div className="App">
                <ParticlesBg type="cobweb" bg={true} />
                <Navigation
                    isSignedIn={isSignedIn}
                    onRouteChange={this.onRouteChange}
                />
                {route === 'home' ? (
                    <div>
                        <Logo />
                        <Rank
                            name={this.state.user.name}
                            entries={this.state.user.entries}
                        />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onPictureSubmit={this.onPictureSubmit}
                        />
                        <FaceRecognition box={box} imageUrl={imageUrl} />
                    </div>
                ) : route === 'signin' ? (
                    <SignIn
                        loadUser={this.loadUser}
                        onRouteChange={this.onRouteChange}
                    />
                ) : (
                    <Register
                        loadUser={this.loadUser}
                        onRouteChange={this.onRouteChange}
                    />
                )}
            </div>
        );
    }
}

export default App;
