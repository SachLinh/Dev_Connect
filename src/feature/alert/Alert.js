import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {removeAlert} from './AlertSlice';

export default function Alert() {
    const dispatch = useDispatch();
    const alerts = useSelector(state => state.alert);
    return (
        <div className='alert-wrapper'>
            {alerts.map((alert, index) =>{
                return(
                    <div key={alert.id + ""} 
                     className={`alert alert-${alert.alertType} d-flex justify-content-between`}>
                        {alert.msg}
                    
                    <span onClick={()=> dispatch(removeAlert(alert.id))}>
                        <i class="far fa-trash-alt"></i>
                    </span>
                    </div>
                )
            })}
        </div>
    )
}
