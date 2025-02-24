"use client";
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
      <HeaderForm title="Nouveau Catégories" href="/dashboard/inventory" />

      {/* Form */}
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="w-full max-w-4xl my-3 mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <FormInputs title="Titre" label="Titre de la catégorie" register={register} errors={errors} />

          <div className="py-4 sm:col-span-1">
            <button 
              type="submit" 
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Ajouter Catégorie
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
