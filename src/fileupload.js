import React, { Component } from 'react';
import axios from "axios";


class FileUpload extends Component {

    // API Endpoints
    custom_file_upload_url = `YOUR_API_ENDPOINT_SHOULD_GOES_HERE`;


    constructor(props) {
        super(props);
        this.state = {
            image_file: null,
            image_preview: '',
            img_url: ''
        }
    }

    // Image Preview Handler
    handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];

        this.setState({
            image_preview: image_as_base64,
            image_file: image_as_files,
        })
    }

    // Image/File Submit Handler
    handleSubmitFile = () => {

        if (this.state.image_file !== null){

            let formData = new FormData();
            formData.append('upl', this.state.image_file);
            // the image field name should be similar to your api endpoint field name
            // in my case here the field name is customFile

            axios.post(
                '/upload',
                formData,
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                    },                    
                }
            )
            .then(res => {
                
                if(res.status === 200){
                    this.setState({
                        img_url: res.data
                    })
                console.log(`Success` + res.data);
                }
                else {
                    console.log('failed upload')
                    this.setState({
                        img_url: ''
                    })
                }
                
            })
            .catch(err => {
                console.log(err);
            })
        }
    }


    // render from here
    render() { 
        return (
            <div>
                {/* image preview */}
                <img src={this.state.image_preview} alt="image preview"/>

                {/* image input field */}
                <input
                    type="file"
                    onChange={this.handleImagePreview}
                />
                <label>Upload file</label>
                <input type="submit" onClick={this.handleSubmitFile} value="Submit"/>
            </div>
        );
    }
}

export default FileUpload;