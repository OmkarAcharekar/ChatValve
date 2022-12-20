import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ARVR = () => {

    const [isCameraOn, setCamOn] = useState(false)
    const [isMicOn, setMicOn] = useState(false)
    const [isAv, setAv] = useState(false)
    const [isVr, setVr] = useState(false)
    const [isMod, setisMod] = useState(false)

    const onReCam = () => { }

    const onToCam = () => { setCamOn(Value => !Value) }

    const onToMic = () => { setMicOn(Value => !Value) }

    const onToAv = () => { setAv(Value => !Value) }

    const onSetVr = () => { setVr(Value => !Value) }

    const onHangup = () => { }
    return (
        <View style={styles.buton}>


            <Pressable onPress={onToMic} style={styles.iconfirst} >
                <MaterialIcons
                    name={isMicOn ? "microphone-off" : 'microphone'}
                    size={30} color={'white'} />
            </Pressable>

            <Pressable style={[styles.iconsecond, { padding: "30px", backgroundColor: 'yello' }]} >
                <MaterialIcons name="phone-hangup"
                    size={30}
                    color={'black'} />
            </Pressable>

            <Pressable onPress={onReCam} style={styles.iconsecond} >
                <IonIcons name="ios-camera-reverse" size={30} color={'white'} />
            </Pressable>

            <Pressable onPress={onToCam} style={styles.iconfirst} >
                <MaterialIcons
                    name={isCameraOn ? "camera-off" : 'camera'}
                    size={30} color={'black'} />
            </Pressable>

        </View>
    )
}

export default ARVR

const styles = StyleSheet.create({
    buton: {

        backgroundColor: '#333333',
        padding: 20,
        borderTopLeftRadius: 15,
        justifyContent: 'space-between',
        padding: 40,
        marginTop: 'auto',
    },

    iconfirst: {
        backgroundColor: '#4a4a4a',
        padding: 23,
        borderRadius: 50,
    }

    iconsecond: {
        backgroundColor: '#4a4a4a',
        padding: 25,
        borderRadius: 23,
    }
})