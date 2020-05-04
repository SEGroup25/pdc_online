import React from 'react';
import {Text} from 'react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';
const cheerio = require('cheerio-without-node-native');
import images from './images/imagesFile'

export async function fetchIftariMenu(){

  var dataToReturn = []
  

  await fetch('https://pdc.lums.edu.pk/')
    .then( response => {return response.text()})
    .then( async htmlText => {
      const $ = cheerio.load(htmlText);
      var key = 1
          const tdList = $('#content_wrap').find('table:nth-child(7)').find('td:nth-child(2)')
         
          const noOfItems = Object.keys(tdList).filter( k => {
            return (parseInt(k) == k)
          })
                
           
          await firestore().collection('Food Gifs').get().then(snapshot => {
            for (var i=1 ; i<noOfItems.length; i++){
              const foodItemAndPrices = {}
              const item = $('#content_wrap').find('table:nth-child(7)').find('td:nth-child(2)')[i].children[0].data
              const priceQuarter = $('#content_wrap').find('table:nth-child(7)').find('td:nth-child(3)')[i].children[0].data
              const priceHalf = $('#content_wrap').find('table:nth-child(7)').find('td:nth-child(4)')[i].children[0].data
              const priceStandard = $('#content_wrap').find('table:nth-child(7)').find('td:nth-child(5)')[i].children[0].data
              if (item != undefined){
                foodItemAndPrices['item'] = item
                foodItemAndPrices['quarter'] = priceQuarter
                foodItemAndPrices['half'] = priceHalf
                foodItemAndPrices['standard'] = priceStandard
                foodItemAndPrices['key'] = key
                key++
                snapshot.forEach(doc => {
                  if(doc.id == item){
                    if(doc.data().exists){
                      foodItemAndPrices['gif'] = images[item.split(' ').join('')]
                    }
                    else{
                      foodItemAndPrices['gif'] = images.notExist
                    }
                  }
                 })
              }
              dataToReturn.push(foodItemAndPrices)
            }
        })
        if(dataToReturn.length == 0){
          dataToReturn = ['Menu not available']
        }
    })
    .catch(err => console.log(err))

    return dataToReturn
}

export async function fetchSehriMenu(){

  var dataToReturn = []

  await fetch('https://pdc.lums.edu.pk/')
    .then( response => {return response.text()})
    .then( async htmlText => {
      const $ = cheerio.load(htmlText);
      var key = 1
          const tdList = $('#content_wrap').find('table:nth-child(4)').find('td:nth-child(2)')
         
          const noOfItems = Object.keys(tdList).filter( k => {
            return (parseInt(k) == k)
          })

          await firestore().collection('Food Gifs').get().then(snapshot => {
            for (var i=1 ; i<noOfItems.length; i++){
              const foodItemAndPrices = {}
              const item = $('#content_wrap').find('table:nth-child(4)').find('td:nth-child(2)')[i].children[0].data
              const priceQuarter = $('#content_wrap').find('table:nth-child(4)').find('td:nth-child(3)')[i].children[0].data
              const priceHalf = $('#content_wrap').find('table:nth-child(4)').find('td:nth-child(4)')[i].children[0].data
              const priceStandard = $('#content_wrap').find('table:nth-child(4)').find('td:nth-child(5)')[i].children[0].data
              if (item != undefined){
                foodItemAndPrices['item'] = item
                foodItemAndPrices['quarter'] = priceQuarter
                foodItemAndPrices['half'] = priceHalf
                foodItemAndPrices['standard'] = priceStandard
                foodItemAndPrices['key'] = key
                key++
                snapshot.forEach(doc => {
                  if(doc.id == item){
                    if(doc.data().exists){
                      foodItemAndPrices['gif'] = images[item]
                    }
                    else{
                      foodItemAndPrices['gif'] = images.notExist
                    }
                  }
                 })
              }
              dataToReturn.push(foodItemAndPrices)
            }
        })
           
        //   for (var i=1 ; i<noOfItems.length; i++){
        //     const foodItemAndPrices = {}
        //     const item = $('#content_wrap').find('table:nth-child(4)').find('td:nth-child(2)')[i].children[0].data
        //     const priceQuarter = $('#content_wrap').find('table:nth-child(4)').find('td:nth-child(3)')[i].children[0].data
        //     const priceHalf = $('#content_wrap').find('table:nth-child(4)').find('td:nth-child(4)')[i].children[0].data
        //     const priceStandard = $('#content_wrap').find('table:nth-child(4)').find('td:nth-child(5)')[i].children[0].data
        //     if (item != undefined){
        //       foodItemAndPrices['item'] = item
        //       foodItemAndPrices['quarter'] = priceQuarter
        //       foodItemAndPrices['half'] = priceHalf
        //       foodItemAndPrices['standard'] = priceStandard
        //       foodItemAndPrices['key'] = key
        //       key++
        //     }
        //     dataToReturn.push(foodItemAndPrices)
        // }
        if(dataToReturn.length == 0){
          dataToReturn = ['Menu not available']
        }
    })
    .catch(err => console.log(err))

    return dataToReturn
}

export async function fetchBreakfastMenu(){

  var dataToReturn = []

  await fetch('https://pdc.lums.edu.pk/')
    .then( response => {return response.text()})
    .then( htmlText => {
      const $ = cheerio.load(htmlText);
      var key = 1
          const tdList = $('#content_wrap').find('table:nth-child(10)').find('td:nth-child(2)')
         
          const noOfItems = Object.keys(tdList).filter( k => {
            return (parseInt(k) == k)
          })
          console.log('numItems',noOfItems)
                
           
          for (var i=1 ; i<noOfItems.length; i++){
            const foodItemAndPrices = {}
            const item = $('#content_wrap').find('table:nth-child(10)').find('td:nth-child(2)')[i].children[0].data
            const priceQuarter = $('#content_wrap').find('table:nth-child(10)').find('td:nth-child(3)')[i].children[0].data
            const priceHalf = $('#content_wrap').find('table:nth-child(10)').find('td:nth-child(4)')[i].children[0].data
            const priceStandard = $('#content_wrap').find('table:nth-child(10)').find('td:nth-child(5)')[i].children[0].data
            if (item != undefined){
              foodItemAndPrices['item'] = item
              foodItemAndPrices['quarter'] = priceQuarter
              foodItemAndPrices['half'] = priceHalf
              foodItemAndPrices['standard'] = priceStandard
              foodItemAndPrices['key'] = key
              key++
            }
            dataToReturn.push(foodItemAndPrices)
        }
        if(dataToReturn.length == 0){
          dataToReturn = ['Menu not available']
        }
    })
    .catch(err => console.log(err))

    return dataToReturn
}
export async function fetchLunchMenu(){

  var dataToReturn = []

  await fetch('https://pdc.lums.edu.pk/')
  .then( response => {return response.text()})
  .then( htmlText => {
    const $ = cheerio.load(htmlText);
    var key = 1
        const tdList = $('#content_wrap').find('table:nth-child(16)').find('td:nth-child(2)')
       
        const noOfItems = Object.keys(tdList).filter( k => {
          return (parseInt(k) == k)
        })
        console.log('numItems',noOfItems)
              
         
        for (var i=1 ; i<noOfItems.length; i++){
          const foodItemAndPrices = {}
          const item = $('#content_wrap').find('table:nth-child(16)').find('td:nth-child(2)')[i].children[0].data
          const priceQuarter = $('#content_wrap').find('table:nth-child(16)').find('td:nth-child(3)')[i].children[0].data
          const priceHalf = $('#content_wrap').find('table:nth-child(16)').find('td:nth-child(4)')[i].children[0].data
          const priceStandard = $('#content_wrap').find('table:nth-child(16)').find('td:nth-child(5)')[i].children[0].data
          if (item != undefined){
            foodItemAndPrices['item'] = item
            foodItemAndPrices['quarter'] = priceQuarter
            foodItemAndPrices['half'] = priceHalf
            foodItemAndPrices['standard'] = priceStandard
            foodItemAndPrices['key'] = key
            key++
          }
          dataToReturn.push(foodItemAndPrices)
      }
      if(dataToReturn.length == 0){
        dataToReturn = ['Menu not available']
      }
  })
  .catch(err => console.log(err))

  return dataToReturn
}
export async function fetchDinnerMenu(){

  var dataToReturn = []

  await fetch('https://pdc.lums.edu.pk/')
    .then( response => {return response.text()})
    .then( htmlText => {
      const $ = cheerio.load(htmlText);
      var key = 1
          const tdList = $('#content_wrap').find('table:nth-child(21)').find('td:nth-child(2)')
         
          const noOfItems = Object.keys(tdList).filter( k => {
            return (parseInt(k) == k)
          })
          console.log('numItems',noOfItems)
                
           
          for (var i=1 ; i<noOfItems.length; i++){
            const foodItemAndPrices = {}
            const item = $('#content_wrap').find('table:nth-child(21)').find('td:nth-child(2)')[i].children[0].data
            const priceQuarter = $('#content_wrap').find('table:nth-child(21)').find('td:nth-child(3)')[i].children[0].data
            const priceHalf = $('#content_wrap').find('table:nth-child(21)').find('td:nth-child(4)')[i].children[0].data
            const priceStandard = $('#content_wrap').find('table:nth-child(21)').find('td:nth-child(5)')[i].children[0].data
            if (item != undefined){
              foodItemAndPrices['item'] = item
              foodItemAndPrices['quarter'] = priceQuarter
              foodItemAndPrices['half'] = priceHalf
              foodItemAndPrices['standard'] = priceStandard
              foodItemAndPrices['key'] = key
              key++
            }
            dataToReturn.push(foodItemAndPrices)
        }
        if(dataToReturn.length == 0){
          dataToReturn = ['Menu not available']
        }
    })
    .catch(err => console.log(err))

    return dataToReturn
}