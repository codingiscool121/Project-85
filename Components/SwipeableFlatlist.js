import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput, Modal, ScrollView, Alert, Dimensions, Animated, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import { render } from 'react-dom';
// import MyHeader from '../Components/MyHeader';
import {ListItem, Icon} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';

export default class SwipeableFlatlist extends React.Component{
    constructor(props){
        super(props)
        this.state={
            allNotifications:this.props.allNotifications
        }
    }

    updateMarkasRead=()=>{
        db.collection('allNotifications').doc(notification.docId).update({
            NotificationStatus: "Read"
        })
    }

    onSwipeChangeValue= swipeData =>{
        var allNotifications = this.state.allNotifications
        console.log(allNotifications)
        const {key,value} = swipeData

        if(value<-Dimensions.get('window').width){
        const newData = [...allNotifications]
        const prevIndex = allNotifications.findIndex(item=>item.key===key)
        this.updateMarkasRead(allNotifications[prevIndex])
        newData.splice(prevIndex,1)
        this.setState({allNotifications:newData})
        }
    }

    renderItem=data=>{
        <ListItem
        title={data.item.ItemName}
        titleStyle={{color:'turquoise', fontWeight:'bold'}}
        subtitle={data.item.message}
        bottomDivider
        />
    }

    renderHiddenItem=()=>{
    <View style={styles.SwipeValue}>
         <View style={[styles.backRightBtn,styles.backRightBtnLeft]}>
             <Text style={styles.backTextWhite}></Text>
         </View>

    </View>
    }
    render(){
        return(
            <View>
                <SwipeListView
                disableRightSwipe
                data={this.state.allNotifications}
                rightOpenValue={-Dimensions.get('window').width}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onSwipeValueChange = {this.onSwipeChangeValue}
                />
            </View>
        )
    }
}

const styles= StyleSheet.create({
    SwipeValue:{
        alignItems: 'center',
        backgroundColor: 'turquoise',
        flex:1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding:10
    },
    backRightBtn:{
        alignItems: 'center',
        justfiyContent: 'center',
        bottom: 0,
        position: 'absolute',
        top: 0,
        width: 100,
    },
    backRightBtnLeft:{
        backgroundColor: 'turquoise',
        right: 0,
    },
    backTextWhite:{
        color:'white',
        fontWeight:'bold',
        fontSize: 20
    }
 })