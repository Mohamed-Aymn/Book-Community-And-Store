export default function ({ options }: { options: any }) {
    return (
        <select>
            {options.map((option: string) => {
                return <option value={option}>{option}</option>;
            })}
        </select>
    );
}
