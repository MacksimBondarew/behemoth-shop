interface ProductReelProps {
    title: string;
    subtitle: string;
}

const ProductReel = ({title}: ProductReelProps) => {
    return (
        <section className="p-12">
            <div className="md:flex md:items-center md:justify-between mb-4">
                <div className="max-w-2x1 px-4 lg:max-w-4x1 lg:px-0">
                    {title ? <h1 className="text-2x1 font-bold text-gray-900 sm:text-3x1">{title}</h1> : null}
                </div>
            </div>
        </section>
    );
};

export default ProductReel;
