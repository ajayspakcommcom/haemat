import React, { useEffect, useState } from 'react';
import axios from "axios";



const Home = (props) => {

    const [person, setPerson] = useState([]);

    useEffect(() => {
        axios.get('http://3.7.254.233:3333/person-list').then(resp => {
            setPerson((prevState) => {
                return resp.data.flat();
            });
        });
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>City</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
                {person.map(item =>
                    <tr key={item.Id}>
                        <td>{item.Id}</td>
                        <td>{item.FirstName}</td>
                        <td>{item.LastName}</td>
                        <td>{item.City}</td>
                        <td>{item.Age}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Home;