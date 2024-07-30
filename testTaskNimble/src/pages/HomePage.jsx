
import ContactsList from '../components/ContactsList/ContactsList';
import CreateContact from '../components/CreateContact/CreateContact';

export default function HomePage() {

    return (
        <div>
        <CreateContact></CreateContact>
        <ContactsList></ContactsList>
        </div>
    );
}