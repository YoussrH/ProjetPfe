
"use client";

import CategorieFixedHeader from '@/app/components/DashboardComponents/CategorieComp/CategorieFixedHeader';
import CategoryTable from '@/app/components/DashboardComponents/CategorieComp/CategoryTable';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function Categories() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div>
    {/* Header */}
    <CategorieFixedHeader label="Gestion des catégories" newLinks="/dashboard/inventory/categories/new"/>

{/* Form */}
<CategoryTable/>    </div>
  )
}
