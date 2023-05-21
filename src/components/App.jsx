import React, { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { nanoid } from "nanoid";

export class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  } 

  componentDidUpdate(prevProps, prevState) {
    
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
 
  formSubmit = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.state.contacts.some(
      (i) =>
        (i.name.toLowerCase() === contact.name.toLowerCase() &&
          i.number === contact.number) ||
        i.number === contact.number
    )
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };


  changeFilterInput = (event) => {
    this.setState({ filter: event.target.value });
  };

  findContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };


  render() {
    const { filter } = this.state;
    return (
      <section>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmit} />
        <h2>Contacts</h2>
        <Filter filter={filter} changeFilterInput={this.changeFilterInput} />
        <ContactList
          contacts={this.findContacts()}
          deleteContact={this.deleteContact}
        />
      </section>
    );
  }
}
