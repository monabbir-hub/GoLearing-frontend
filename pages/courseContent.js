import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion'
function courseContent(props) {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios
      .get('https://api.npoint.io/c7d229768418873120a4')
      .then((res) => {
        // const receivedData = Object.values(res.data)
        const receivedData1 = Object.values(Object.values(res.data)[0])
        const receivedData2 = Object.values(receivedData1[0].subs)

        setItems(Object.values(receivedData2))
      })
      .catch((err) => {})
  }, [])

  return (
    <div className='container'>
      {items.length > 0 && (
        <div className='col-2'>
          <p>Accordion menu</p>
          <Accordion allowZeroExpanded>
            {items.map((module, index) => (
              <AccordionItem key={module._id}>
                <AccordionItemHeading>
                  <AccordionItemButton>{module.title}</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <Accordion allowZeroExpanded>
                    {module.contents.map((item) => (
                      <AccordionItem key={item._id}>
                        <AccordionItemHeading>
                          <AccordionItemButton>
                            {item.content_type}
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>{item.title}</AccordionItemPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
          {/* <Accordion allowZeroExpanded>
            {items[0].contents.map((item) => (
              <AccordionItem key={item._id}>
                <AccordionItemHeading>
                  <AccordionItemButton>{item.content_type}</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>{item.title}</AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion> */}
        </div>
      )}
    </div>
  )
}

export default courseContent
