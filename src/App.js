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

const initialState = {
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

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
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
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const imageWidth = Number(image.width);
        const imageHeight = Number(image.height);

        //Calculate faces
        return {
            topRow: clarifaiFace.top_row * imageHeight,
            leftCol: clarifaiFace.left_col * imageWidth,
            bottomRow: imageHeight - (clarifaiFace.bottom_row * imageHeight),
            rightCol: imageWidth - (clarifaiFace.right_col * imageWidth)
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
        fetch(`${process.env.REACT_APP_API_URL}/imageurl`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input: this.state.input,
            }),
        })
            .then((response) => {
                if (response.status === 500) {
                    throw new Error(
                        'Whoops! Sorry, we are currently unable to connect to the API.'
                    );
                }
                return response.json();
            })
            .then((result) => {
                //console.log(result)
                if (result) {
                    fetch(`${process.env.REACT_APP_API_URL}/image`, {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: this.state.user.id,
                        }),
                    })
                        .then((response) => response.json())
                        .then((count) => {
                            this.setState(
                                Object.assign(this.state.user, {
                                    entries: count,
                                })
                            );
                        })
                        .catch(console.log);
                }
                this.displayFaceBox(this.calculateFaceLocation(result));
            })
            .catch((err) => console.log(err));
    };

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState);
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
