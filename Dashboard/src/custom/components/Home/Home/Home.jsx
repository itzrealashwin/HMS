import React from 'react';
import bed from '../../../../assets/bed.svg';
import patient from '../../../../assets/patient.svg';
import stethoscopeicon from '../../../../assets/stethoscopeicon.svg';
import { Card } from '@/components/ui/card';

function HomePageLayout() {
  return (
    <section className="py-16 bg-[#f9f9f9]">
      <div className="container mx-auto text-center mb-12">
        <h1 className="text-2xl font-semibold">We value Each and Every Human life</h1>
      </div>
      <div className="container mx-auto flex flex-wrap justify-around gap-8">
        <Card className="w-full md:w-1/4 p-8 flex justify-center flex-col items-center bg-[#B7E4C7] rounded-lg">
          <img src={bed} alt="Beds" className="mx-auto mb-4" />
          <p className="text-xl font-semibold">400+ Beds</p>
        </Card>
        <Card className="w-full md:w-1/4 flex justify-center flex-col items-center p-8 bg-[#B7E4C7] rounded-lg">
          <img src={patient} alt="Patients" className="mx-auto mb-4" />
          <p className="text-xl font-semibold">1 Lac+ Patients Treated</p>
        </Card>
        <Card className="w-full md:w-1/4 p-8 flex justify-center flex-col items-center bg-[#B7E4C7] rounded-lg">
          <img src={stethoscopeicon} alt="Doctors" className="mx-auto mb-4" />
          <p className="text-xl font-semibold">45+ Expert Doctors</p>
        </Card>
      </div>
    </section>
  );
}

export default HomePageLayout;
