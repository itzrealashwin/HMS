export default function FirstB() {
    return (
        <div className="max-w-screen-lg mx-auto text-[#2D6A4F] font-semibold px-4 sm:px-6 lg:px-8">
            <h1 className="text-center mt-2 text-4xl sm:text-5xl font-bold font-poppins">
                ABOUT US
            </h1>
            <hr className="my-4 border-[#2D6A4F]" />
            <div className="flex flex-col lg:flex-row lg:justify-center items-center gap-8 lg:gap-16 py-4">
                <div className="w-full lg:w-1/2 max-w-xl">
                    <p className="mb-4">
                        Medicine has been practiced since prehistoric times, and for most of this time it was an art 
                        (an area of creativity and skill), frequently having connections to the religious and
                        philosophical beliefs of local culture. For example, a medicine man would apply herbs and say prayers for healing, or an ancient philosopher and physician would
                    </p>
                    <p>
                        apply bloodletting according to the theories of humorism. In recent centuries, since the advent of modern science, most medicine has 
                        become a combination of art and science (both basic and applied, under the umbrella of medical science). For example, while stitching technique for sutures is an art learned 
                        through practice, knowledge of what happens at the cellular and molecular level in the tissues being stitched arises through science.
                    </p>
                </div>
                <div className="w-full lg:w-1/2 flex justify-center">
                    <iframe
                        width="100%"
                        height="245"
                        className="rounded-2xl"
                        src="https://www.youtube.com/embed/KmYm6zphh_A?si=aXQzoLhZqWPgB0fO"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
