import React, {ReactElement, useEffect, useState} from "react"
import {FunctionComponent} from "react"
import {RootStateOrAny, useDispatch, useStore} from "react-redux";
import {useHistory} from "react-router";
import {LoadingSpinner} from "./LoadingSpinner";
import {Dispatch} from "redux";

type BootloaderProps = {
    stages: ((dispatch: Dispatch, history?: any, state?: RootStateOrAny) => Promise<void>)[],
    children: ReactElement[]
}

const Bootloader: FunctionComponent<BootloaderProps> = ({children, stages}: BootloaderProps) => {
    const [allResolved, setAllResolved] = useState(false)
    const dispatch = useDispatch()
    const store = useStore()
    const history = useHistory()

    useEffect( () => {
        (async () => {
            await stages.reduce(async (semaphore: Promise<void>, stage: (dispatch: Dispatch, history?: any, state?: RootStateOrAny) => Promise<void>) => {
                await semaphore
                return stage(dispatch, history, store.getState())
            }, Promise.resolve())
            setAllResolved(true)
        })()
    }, [])

    return (
        <>
            {
                allResolved && children
            }{
                !allResolved &&
                <div>
                    <LoadingSpinner />
                </div>
            }

        </>
    )
}

export {Bootloader}