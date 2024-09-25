export default function Address() {
    return (
        <div className="bg-green-50 p-6 sm:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-12">
                {/* Address Section */}
                <div className="flex flex-col gap-4 lg:w-1/3">
                    <h2 className="font-bold text-xl sm:text-2xl">Address</h2>
                    <h3 className="font-semibold text-lg sm:text-xl">India:</h3>
                    <p className="text-sm sm:text-base">
                        2/642 Floor, Habeeba Street East Coast Road,
                        <br />
                        Neelangarai Chennai - 600115
                    </p>
                    <h3 className="font-semibold text-lg sm:text-xl">United Kingdom:</h3>
                    <p className="text-sm sm:text-base">
                        7 Offord Grove, Leavesden, Watford
                        <br />
                        - WD25 7NF U.K.
                    </p>
                    <p className="text-sm sm:text-base">+44 79181-97837</p>
                </div>

                {/* Other Branches Section */}
                <div className="flex flex-col gap-4 lg:w-1/3">
                    <h2 className="font-bold text-xl sm:text-2xl">Other Branches</h2>
                    <h3 className="font-semibold text-lg sm:text-xl">Chennai</h3>
                    <p className="text-sm sm:text-base">+917350 7371</p>
                    <h3 className="font-semibold text-lg sm:text-xl">Bangalore</h3>
                    <p className="text-sm sm:text-base">+918725 4563</p>
                    <h3 className="font-semibold text-lg sm:text-xl">Hyderabad</h3>
                    <p className="text-sm sm:text-base">+91956 4562</p>
                    <h3 className="font-semibold text-lg sm:text-xl">Madurai</h3>
                    <p className="text-sm sm:text-base">+91073 17350</p>
                </div>

                {/* Additional Branches Section */}
                <div className="flex flex-col gap-4 lg:w-1/3">
                    <h3 className="font-semibold text-lg sm:text-xl">Mumbai</h3>
                    <p className="text-sm sm:text-base">+918511 579566</p>
                    <h3 className="font-semibold text-lg sm:text-xl">Dibrugarh</h3>
                    <p className="text-sm sm:text-base">+915795 5698</p>
                    <h3 className="font-semibold text-lg sm:text-xl">Dubai</h3>
                    <p className="text-sm sm:text-base">+97150 145 1401</p>
                    <h3 className="font-semibold text-lg sm:text-xl">Ireland</h3>
                    <p className="text-sm sm:text-base">+353 85 164 9796</p>
                </div>
            </div>
        </div>
    );
}
