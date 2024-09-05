'use client';
import { FormFieldData, PlaceType } from '../type/form.type';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { postUsers } from '@/lib/user';
import { regions } from '@/lib/region';

export default function FormField() {
  const [provinsi, setProvinsi] = useState<string>('');
  const [kota, setKota] = useState<string>('');
  const [kecamatan, setKecamatan] = useState<string>('');

  // Derive options based on selected provinsi and kota
  const provinsiOptions = Object.keys(regions);
  const kotaOptions = provinsi ? Object.keys(regions[provinsi]) : [];
  const kecamatanOptions = kota ? regions[provinsi][kota] : [];

  const FormSchema = yup.object().shape({
    nama: yup.string().max(256).required('Nama harus diisi'),
    provinsi: yup.string(),
    kota: yup.string().required('Kota/Kabupaten harus diisi'),
    kecamatan: yup.string().required('Kecamatan harus diisi'),
    alamat: yup.string().max(256).required('Alamat harus diisi'),
  });

  const onForm = async (data: FormFieldData) => {
    try {
      const response = await postUsers(data);
      await response.json();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div className="text-gray-700">
      <Formik
        initialValues={{
          nama: '',
          kota: '',
          kecamatan: '',
          alamat: '',
          provinsi: '',
        }}
        validationSchema={FormSchema}
        onSubmit={(values, action) => {
          console.log(values);
          onForm(values);
          action.resetForm();
        }}
      >
        {({ setFieldValue, dirty, isValid }) => {
          return (
            <Form className="h-screen flex justify-center items-center">
              <div className="card w-[35rem] bg-base-100 shadow-xl my-10">
                <h2 className="text-3xl font-bold p-9">Daftar Siswa</h2>

                <div className="card-body">
                  {/* Nama */}
                  <div className="form-control mb-4">
                    <label htmlFor="nama" className="label">
                      <span className="label-text">Nama Siswa</span>
                    </label>
                    <Field
                      type="text"
                      placeholder="Masukkan Nama"
                      name="nama"
                      className="input input-bordered w-full"
                    />
                    <ErrorMessage
                      component="div"
                      name="nama"
                      className="text-error mt-1"
                    />
                  </div>

                  {/* Provinsi */}
                  <div className="form-control mb-4">
                    <label htmlFor="provinsi" className="label">
                      <span className="label-text">Provinsi</span>
                    </label>
                    <Field
                      as="select"
                      name="provinsi"
                      className="input input-bordered w-full"
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        const selectedProvinsi = e.target.value;
                        setFieldValue('provinsi', selectedProvinsi);
                        setProvinsi(selectedProvinsi);
                        setKota('');
                        setKecamatan('');
                      }}
                    >
                      <option value="">Select Provinsi</option>
                      {provinsiOptions.map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      component="div"
                      name="provinsi"
                      className="text-error mt-1"
                    />
                  </div>

                  {/* Kota */}
                  <div className="form-control mb-4">
                    <label htmlFor="kota" className="label">
                      <span className="label-text">Kota</span>
                    </label>
                    <Field
                      as="select"
                      name="kota"
                      className="input input-bordered w-full"
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        const selectedKota = e.target.value;
                        setFieldValue('kota', selectedKota);
                        setKota(selectedKota);
                        setKecamatan('');
                      }}
                      disabled={!provinsi}
                    >
                      <option value="">Select Kota/Kabupaten</option>
                      {kotaOptions.map((kota) => (
                        <option key={kota} value={kota}>
                          {kota}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      component="div"
                      name="kota"
                      className="text-error mt-1"
                    />
                  </div>

                  {/* Kecamatan */}
                  <div className="form-control mb-4">
                    <label htmlFor="kecamatan" className="label">
                      <span className="label-text">Kecamatan</span>
                    </label>
                    <Field
                      as="select"
                      name="kecamatan"
                      className="input input-bordered w-full"
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setFieldValue('kecamatan', e.target.value);
                        setKecamatan(e.target.value);
                      }}
                      disabled={!kota}
                    >
                      <option value="">Select Kecamatan</option>
                      {kecamatanOptions.map((kec: any) => (
                        <option key={kec} value={kec}>
                          {kec}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      component="div"
                      name="kecamatan"
                      className="text-error mt-1"
                    />
                  </div>
                  {/* Alamat */}
                  <div className="form-control mb-4">
                    <label htmlFor="alamat" className="label">
                      <span className="label-text">Alamat</span>
                    </label>
                    <Field
                      type="text"
                      placeholder="Masukkan Alamat"
                      name="alamat"
                      className="input input-bordered w-full"
                    />
                    <ErrorMessage
                      component="div"
                      name="alamat"
                      className="text-error mt-1"
                    />
                  </div>

                  {/* Submit */}
                  <div className="form-control mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary w-full"
                      disabled={!dirty || !isValid}
                    >
                      Kirim
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
