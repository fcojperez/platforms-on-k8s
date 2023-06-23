'use client'
import { useState, useEffect } from 'react'
import NotificationItem from './notificationitem'



function NotificationList() {
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [notifications, setNotifications] = useState([]) // state hook
    const [check, setCheck] = useState(0)

    const fetchData = () => {
        fetch('/api/notifications/')
                   .then((res) => res.json())
                   .then((data) => {
                   console.log("Fetching Notifications ...")
                   setNotifications(data)
                   setLoading(false)
                  
                   }).catch((error) => {
                       console.log(error)
                   })
               }

    useEffect(() => {
         const id = setInterval(() => {
        setLoading(true)
    
        fetchData()
         }, 3000);
             return () => clearInterval(id);
        }, [check])

    useEffect(() => {
       
        setLoading(true)
        fetchData()
       
       
        }, [])



    return (
      <div>

            
        

        <div>
        {
        notifications && notifications.map((item,index)=>(
              <NotificationItem
                key={item.Id}
                id={item.Id}
                title={item.Title}
                emailTo={item.EmailTo}
                emailBody={item.EmailBody}
                emailSubject={item.EmailSubject}
                approved={item.Approved}
              />

          ))
        }
        {
          notifications && notifications.length === 0 && (
            <span>There are no notifications.</span>
          )
        }
        </div>
      </div>
    );

}
export default NotificationList;