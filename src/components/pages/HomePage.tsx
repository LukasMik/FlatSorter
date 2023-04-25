import {useEffect, useState} from "react";
import {IFlat} from "../../types.ts";
import {getAllFlatsAPI} from "../../apiServices/getAllFlatsAPI.tsx";
import {FlatItem} from "../FlatItem.tsx";
import {EditFlatModal} from "../modals/EditFlatModal.tsx";
import {toggleFlatData} from "../../services/toggleFlatData.ts";
import {useLocation} from "react-router-dom";

export const HomePage = () => {
    const [flats, setFlats] = useState<IFlat[]>([])
    const [reload, setReload] = useState<boolean>(false)
    const [isFormPrepared, setIsFormPrepared] = useState<boolean>(false)

    useEffect(() => {
        getAllFlatsAPI().then(flats => setFlats(flats))
    }, [reload, isFormPrepared])

    if (useLocation().pathname === '/history') {
        return (
            <>
                <h3 className='mb-12 text-center'>History:</h3>
                <div className='flex items-cenetr justify-center flex-wrap gap-20'>
                    {flats.length > 0 && flats.filter(flat => !flat.isVisible)
                        .sort((a, b) => new Date(b.lastEditAt).getDate() - new Date(a.lastEditAt).getDate())
                        .sort((a, b) => new Date(b.lastEditAt).getTime() - new Date(a.lastEditAt).getTime())
                        .map(flat => <FlatItem key={flat.id} flat={flat}
                                               handleEdit={(status, flat) => toggleFlatData(status, flat, () => setReload(!reload))}/>)}
                </div>
            </>
        )
    } else {
        return (
            <>
                <h3 className='mb-12 text-center'>Favourites:</h3>
                <div className='flex items-cenetr justify-center flex-wrap gap-20'>
                    {flats.length > 0 && flats.filter(flat => flat.isFavorite && flat.isVisible)
                        .sort((a, b) => new Date(b.lastEditAt).getDate() - new Date(a.lastEditAt).getDate())
                        .sort((a, b) => new Date(b.lastEditAt).getTime() - new Date(a.lastEditAt).getTime())
                        .map(flat => {
                            return <FlatItem key={flat.id} flat={flat}
                                             handleEdit={(status, flat) => toggleFlatData(status, flat, () => setReload(!reload))}/>
                        })}
                </div>
                <h3 className='my-12 text-center'>Others:</h3>
                <div className='flex items-cenetr justify-center flex-wrap gap-20'>
                    {flats.length > 0 && flats.filter(flat => !flat.isFavorite && flat.isVisible)
                        .sort((a, b) => new Date(b.lastEditAt).getDate() - new Date(a.lastEditAt).getDate())
                        .sort((a, b) => new Date(b.lastEditAt).getTime() - new Date(a.lastEditAt).getTime())
                        .map(flat => {
                            return <FlatItem key={flat.id} flat={flat}
                                             handleEdit={(status, flat) => toggleFlatData(status, flat, () => setReload(!reload))}/>
                        })}
                </div>
                <div className="fixed bottom-6 right-6">
                    <div title='Add new flat' onClick={() => setIsFormPrepared(true)}>
                        <EditFlatModal status='new' onOpenChange={() => setIsFormPrepared(false)}
                                       isFormPrepared={isFormPrepared}/>
                    </div>
                </div>
            </>
        )
    }
}