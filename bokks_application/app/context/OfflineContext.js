import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';
import {useNetInfo} from "@react-native-community/netinfo";

export const OfflineContext = createContext();

export const OfflineProvider = ({children}) => {
    const [queue, setQueue] = useState([]);
    const netInfo = useNetInfo();

    const getQueue = async () => {
        try {
            const queue = await AsyncStorage.getItem('queue');
            const value = JSON.parse(queue);
            if (value)
                setQueue(value);
            else
                setQueue([]);
        } catch (error) {
            console.log("Error caught at getQueue: " + error);
        }
    };

    const addToQueue = async (url, requestBody) => {
        let request = {url: url, requestBody: requestBody}
        await getQueue();

        let newQueue = queue;
        newQueue.push(JSON.stringify(request));
        await AsyncStorage.setItem('queue', JSON.stringify(newQueue))
        setQueue(newQueue);
        }

    const clearQueue = async () => {
        try {
            await AsyncStorage.removeItem('queue');
        } catch (error) {
            console.log(error);
        }
    };

    const syncQueue = async () => {
        await getQueue();
        let newQueue = queue;

        for (let i = 0; i < newQueue.length; i++){
            let item = JSON.parse(newQueue[i]);
            let response;
            if (item['requestBody']['method'] != 'DELETE') {
                let formdata = new FormData();
                for (const [key, val] of Object.entries(item['requestBody']['body'])) {
                    formdata.append(key, val);
                }
                item['requestBody']['body'] = formdata;
                response = await fetch(item['url'], item['requestBody']).catch(() => {
                })
            } else {
                response = await fetch(item['url'], item['requestBody']).catch(() => {
                })
            }
            if (response && response.ok) {
                alert("Data synchronization was successful! ");
            }
        }
        await clearQueue();
        setQueue([]);
    }

    useEffect(() => {
        if (netInfo.isInternetReachable) {
            syncQueue();
        }
    }, [netInfo]);

    return (
        <OfflineContext.Provider
            value={{
                getQueue,
                queue,
                addToQueue,
                clearQueue,
                syncQueue,
            }}>
            {children}
        </OfflineContext.Provider>
    );
};
