import React from 'react';
import { useParams } from 'react-router-dom';

const TransformationPage = () => {
    const { id } = useParams();
    return <h1>Transformation Page for ID: {id}</h1>;
};

export default TransformationPage;