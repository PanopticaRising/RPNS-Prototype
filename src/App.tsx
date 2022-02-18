import logo from './logo.svg';
import './App.css';
import { Form, TextInput, Button, Header, GovBanner, Label } from '@trussworks/react-uswds'

function App() {
  return (<>
    <GovBanner></GovBanner>
    <Header>
      <div className='header-div'>
        <img src={logo} alt='logo' height={'100rem'} /><h1 className='header-text'>Department for the Protection of Pets</h1>
      </div>
    </Header>
    <div className='form-div'>
      <Form onSubmit={() => console.log('submit')}>
        <h2>Sign Up for Rescue Alerts!</h2>
        <Label htmlFor='full_name'>Full Name</Label>
        <TextInput id='full_name' name='full_name' type={'text'} />
        <Label htmlFor='pet_name'>Pet Name</Label>
        <TextInput id='pet_name' name='pet_name' type={'text'} />
        <Label htmlFor='pet_id'>Pet ID</Label>
        <TextInput id='pet_id' name='pet_id' type={'text'} />
        <Label htmlFor='phone'>Phone Number</Label>
        <TextInput id='phone' name='phone' type={'tel'} />
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  </>
  );
}

export default App;
