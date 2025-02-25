"use client";
import CategoryForm from '@/app/components/DashboardComponents/CategorieComp/CategoryForm';
import CategoryTable from '@/app/components/DashboardComponents/CategorieComp/CategoryTable';
import FixedHeader from '@/app/components/DashboardComponents/FixedHeader';
import FormInputs from '@/app/components/DashboardComponents/FormInputs';
import HeaderForm from '@/app/components/DashboardComponents/HeaderForm';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function NewCategories() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="font-sans">
      {/* Header */}
      <FixedHeader newLinks="/dashboard/inventory/items/new"/>
{/*       <HeaderForm title="Nouveau Catégories" href="/dashboard/inventory" />
 */}
      {/* Form */}
      <CategoryTable/>
    </div>
  );
}
