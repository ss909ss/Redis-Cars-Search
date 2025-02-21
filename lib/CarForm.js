export default function CarForm() {
    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData(event.target);
        const formData = Object.fromEntries(form.entries());

        console.log(formData);

        const res = await fetch('/api/cars',{
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        const result = await res.json();
        console.log(result)
    };

    return (
        <form onSubmit={handleSubmit}>
            {['CarBrand', 'CarClass', 'CarCost', 'Image', 'Description'].map((field) => (
                <div key={field} className="mb-4">
                    <label htmlFor={field} className="block text-gray-700 font-medium mb-1">
                        {field}
                    </label>
                    <input 
                        name={field} 
                        type="text" 
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            ))}
            <button type="submit">Create Car</button>
        </form>
    );
}