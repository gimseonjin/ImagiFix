// src/pages/TransformationAdd.js
import React from 'react';
import { useParams } from 'react-router-dom';

const TransformationAddTypePage = () => {
    const { type } = useParams();
    return <h1>Add Transformation Page for Type: {type}</h1>;
};

export default TransformationAddTypePage;
