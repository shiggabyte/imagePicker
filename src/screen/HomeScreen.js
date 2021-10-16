import React, { useEffect, useState } from 'react';
import dataURLtoBlob from 'dataurl-to-blob';
import { View, Text, TouchableHighlight, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Input, Button, Card, Icon } from 'react-native-elements';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [product, setProduct] = useState(null);
    const [price, setPrice] = useState(null);
    const [desc, setDesc] = useState(null);

    const upload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    const submit = async () => {
        /*

        We get either a <file> object, <dataurl> string or <filepath> string as the
        selected file from file pickers

        The formdata object entry values are expected to be one of the folowing types
        - File object
        - Blob object
        - Normal object with the following properties
            name <string>
            type <string>
            uri  <filepath>

        Files that are part of formdata are extracted out of the request body
        and placed under a different request field, usually <file> or <files>

        */

        const data = new FormData();

        const ext = image.startsWith('data:')
                        ? image.split(':')[1].split('/')[1].split(';')[0]
                        : image.split('.')[image.split('.').length - 1]

        const file = image.startsWith('data:')
                        ? dataURLtoBlob(image)
                        : { uri: image, type: 'image/jpg', name: 'name.' + ext }

        data.append('image', file, 'name.' + ext);

        //const body = { todo };
        //const data = new FormData();
        /*data.append('name', product);
        data.append('price', price);
        data.append('description', desc);*/
        // data.append('image', {
        //     uri: image,
        //     type: 'image/jpg',
        //     name: 'name.jpg'
        // });

        axios.post("http://localhost:5000/Products/upload", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(response => {
            alert(response.data);
        }).catch(error => {
            const statusCode = error.response ? error.response.status : null;
            if (statusCode === 404) {
                console.log(error.message);
            } else {
                console.log('Error: ', error.message);
            }
        });



        /*axios.get(`http://192.168.43.99:5000/Products/${product}`)
            .then(response => {
                alert(response.data);
            }).catch(error => {
                const statusCode = error.response ? error.response.status : null;
                if (statusCode === 404) {
                    console.log(error.message);
                } else {
                    console.log('Error: ', error.message);
                }
            });*/
    };

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.container}>
                <Input
                    placeholder="Product name"
                    leftIcon={{ type: 'font-awesome', name: 'cart-plus' }}
                    style={styles.input}
                    onChangeText={value => setProduct(value)}
                />
                <Input
                    placeholder="Product price"
                    leftIcon={{ type: 'font-awesome', name: 'money' }}
                    style={styles.input}
                    onChangeText={value => setPrice(value)}
                />
                <Input
                    placeholder="Product Description"
                    leftIcon={{ type: 'font-awesome', name: 'database' }}
                    style={styles.input}
                    onChangeText={value => setDesc(value)}
                />
                <Text>Please Select an Image</Text>
                <TouchableHighlight onPress={upload}>
                    <Text>upload</Text>
                </TouchableHighlight>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                <Button
                    icon={<Icon name='code' color='#ffffff' />}
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    title='Add'
                    onPress={submit}
                />

            </View>

        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    input: {
        marginVertical: 10,
        borderBottomWidth: 0
    },
    container: {
        width: '90%',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        padding: 20,
        marginVertical: 50,
        borderRadius: 10
    }
});

/*{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}*/