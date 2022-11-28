import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";

const Blog = () => {
  return (
    <div className='w-full lg:w-2/3 mx-auto mb-36'>
      <h2 className='text-4xl text-center my-10'>Blog</h2>
      <Accordion>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              What are the different ways to manage a state in a React
              application?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              There are four main types of state you need to properly manage in
              your React apps:
              <ol>
                <li>** Local state</li>
                <li>** Global state</li>
                <li>** Server state</li>
                <li>** URL state</li>
              </ol>
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              How does prototypical inheritance work?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              The Prototypal Inheritance is a feature in javascript used to add
              methods and properties in objects. It is a method by which an
              object can inherit the properties and methods of another object.
              Traditionally, in order to get and set the [[Prototype]] of an
              object, we use Object. getPrototypeOf and Object.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              What is a unit test? Why should we write unit tests?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              The main objective of unit testing is to isolate written code to
              test and determine if it works as intended. Unit testing is an
              important step in the development process, because if done
              correctly, it can help detect early flaws in code which may be
              more difficult to find in later testing stages.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              React vs. Angular vs. Vue?
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              React : React is a JavaScript library developed by Facebook which,
              among other things, was used to build Instagram.com. Its aim is to
              allow developers to easily create fast user interfaces for
              websites and applications alike. The main concept of React. js is
              virtual DOM.
              <br />
              <br />
              Angular : Angular is an open-source, JavaScript framework written
              in TypeScript. Google maintains it, and its primary purpose is to
              develop single-page applications. As a framework, Angular has
              clear advantages while also providing a standard structure for
              developers to work with.
              <br />
              <br />
              Vue : Vue (pronounced /vjuː/, like view) is a JavaScript framework
              for building user interfaces. It builds on top of standard HTML,
              CSS, and JavaScript and provides a declarative and component-based
              programming model that helps you efficiently develop user
              interfaces, be they simple or complex.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Blog;
