import React, { Component } from 'react';
import L from 'leaflet';
import APIManager from "../../modules/APIManager";
import ReactMapboxGl, { Layer, Marker, Feature, Image } from 'react-mapbox-gl';
import '../../../node_modules/mapbox-gl/dist/mapbox-gl.css'
import '../dashboard/issues.css';


const token = 'pk.eyJ1IjoicXVpbndpdGhvbmVuIiwiYSI6ImNrMm1yZDk2aTBreGkzZHBocnAxc3MxMnkifQ._kujyGjuP-X65_T9d9OOfA';

const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoicXVpbndpdGhvbmVuIiwiYSI6ImNrMm1yZDk2aTBreGkzZHBocnAxc3MxMnkifQ._kujyGjuP-X65_T9d9OOfA',
    minZoom: 5,
    maxZoom: 15
});


export default class ReactMap extends Component {

    state = {
        popup: false,
        name: '',
        center: [-86.7816, 36.1627],
        zoom: [11],
        issues: []
    };

    componentDidMount() {
        APIManager.getAll("issues").then(issues => {
            this.setState({
                issues: issues
            });
        });
    }


    render() {

        return <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
                height: '75vh',
                width: '40vw'
            }}
            center={this.state.center}
        >
            {this.state.issues.map(issue => (
                <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                    <Marker
                        coordinates={[issue.longitudeValue, issue.latitudeValue]}
                        anchor="bottom"/>
                </Layer>
            ))}
        </Map>
    }
}