import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import NavBar from "../components/NavBar.jsx";
import SignUp from "../components/SignUp.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/NavBar">
                <NavBar/>
            </ComponentPreview>
            <ComponentPreview path="/SignUp">
                <SignUp/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews