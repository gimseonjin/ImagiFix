// src/pages/TransformationUpdate.js
import React from 'react';
import { useParams } from 'react-router-dom';

const TransformationUpdatePage = () => {
    const { id } = useParams();
    return <h1>Update Transformation Page for ID: {id}</h1>;
};

export default TransformationUpdatePage;
