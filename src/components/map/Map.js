import React, { Component } from 'react';
// import L from 'leaflet';
import ReactMapboxGl, { Layer } from 'react-mapbox-gl';
// import { Marker } from 'react-mapbox-gl';
import 'leaflet/dist/leaflet.css';
import '../dashboard/issues.css';
// import styled from 'styled-components'

// const Wrapper = styled.div`
//     width: ${props => props.width};
//     height: ${props => props.height};
//     `;

const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoicXVpbndpdGhvbmVuIiwiYSI6ImNrMm1yYXUyeTBsMXEzaGxwcTh5MXUyY3cifQ.x4yUJN7b4CIuxtM3e0lTSw',
    minZoom: 5,
    maxZoom: 15
});


export default class ReactMap extends Component {

    state = {
		popup: false,
		coordinates: [],
		name: '',
		center: [-86.7816, 36.1627],
		zoom: [13]
	};

    render() {
        return <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
                height: '75vh',
                width: '40vw'
            }}
            center= {this.state.center}

        >
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                {/* <Feature coordinates={[-86.7816, 36.1627]}/> */}
            </Layer>
        </Map>
    }
}