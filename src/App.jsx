import React, { useContext, useState } from 'react';
import Header from './KaiUI/components/Header/Header';
import { SoftKeyProvider } from './KaiUI/components/SoftKey/SoftKeyProvider';
import TabView from './KaiUI/views/TabView/TabView';
import ListView from './KaiUI/views/ListView/ListView';
import CheckboxListItem from './KaiUI/components/CheckboxListItem/CheckboxListItem';
import IconListItem from './KaiUI/components/IconListItem/IconListItem';
import TextListItem from './KaiUI/components/TextListItem/TextListItem';
import BodyTextListItem from './KaiUI/components/BodyTextListItem/BodyTextListItem';
import ArrowListItem from './KaiUI/components/ArrowListItem/ArrowListItem';
import RadioButtonListItem from './KaiUI/components/RadioButtonListItem/RadioButtonListItem';
import Separator from './KaiUI/components/Separator/Separator';
import ProgressBar from './KaiUI/components/ProgressBar/ProgressBar';
import Slider from './KaiUI/components/Slider/Slider';
import Button from './KaiUI/components/Button/Button';
import TextInput from './KaiUI/components/TextInput/TextInput';
import ToastContext, { ToastContextProvider } from './KaiUI/contexts/ToastContext/ToastContext';
import './App.scss';
import colors from './KaiUI/theme/colors.scss';
import exampleIcon from './assets/example.png';

function App() {
  const handleInputChange = newVal => {
    console.log('new input value', newVal);
  };

  const App = () => {
    const [inputValue, setInputValue] = useState('');
    const { showToast } = useContext(ToastContext);
    const toastValues = ['Mmmm... Toasty!', '*pop* toast\'s done!', 'Hey, I\'m a toast!'];
    return (
      <div className="App">
        <Header text="KaiUI" backgroundColor={colors.headerPurple} />
        <SoftKeyProvider>
          <div className="content">
            <TabView
              tabLabels={[
                'CB Tab',
                'Icon Tab',
                'Txt Tab',
                'Form Tab',
                'Misc Tab'
              ]}
            >
              <ListView>
                <CheckboxListItem
                  primary="Hello primary text"
                  secondary="seconday text"
                  initCheckboxVal={false}
                  onInputChange={() => {}}
                  checkboxSide="left"
                />
                <Separator separatorText={'hello, separator here'} />
                <CheckboxListItem
                  primary="Another item with more text"
                  secondary="secondary text at the bottom"
                  initCheckboxVal={true}
                  onInputChange={() => {}}
                  checkboxSide="right"
                  focusColor={colors.carrotOrange}
                />
                <RadioButtonListItem
                  primary="Radio button"
                  secondary="Secondary text"
                  initButtonVal={false}
                  onInputChange={handleInputChange}
                  buttonSide="right"
                />
                <RadioButtonListItem
                  primary="Another radio button"
                  initButtonVal={true}
                  onInputChange={handleInputChange}
                  buttonSide="right"
                />
              </ListView>
              <ListView>
                <IconListItem
                  primary="List Item"
                  secondary="... with asset icon"
                  iconSrc={exampleIcon}
                />
                <IconListItem
                  primary="List Item"
                  secondary="... with font icon"
                  icon="kai-icon-favorite-off"
                />
                <Slider
                  header="I am a slider"
                  initialValue={3}
                  minValue={0}
                  maxValue={10}
                />
                <Button
                  text="A button"
                  icon="kai-icon-camera"
                  iconSide="left"
                  onClick={() => {}}
                />
                <Button text="A button" iconSrc={exampleIcon} iconSide="right" onClick={()=> {}} />
                <Button
                  text="Button with icon softkey"
                  softKeyIcon="kai-icon-favorite-off"
                  onClick={() => {}}
                />
                <Separator separatorText={'Another separator'} />
                <IconListItem
                  primary="Item without secondary"
                  icon="kai-icon-wifi"
                />
                <IconListItem primary="Last item" icon="kai-icon-camera" />
              </ListView>
              <ListView>
                <ProgressBar
                  header={'Downloading...'}
                  percentage={80}
                  type={'download'}
                  focusColor={colors.lime}
                />
                <ProgressBar
                  header={'Downloading...'}
                  percentage={30}
                  type={'download'}
                />
                <TextListItem
                  primary="Hello primary text"
                  secondary="secondary text"
                  tertiary="tertiary text"
                  focusColor={colors.gold}
                />
                <ProgressBar
                  header={'Buffering...'}
                  percentage={30}
                  type={'buffer'}
                />
                <ProgressBar
                  header={'Buffering...'}
                  percentage={70}
                  type={'buffer'}
                />
                <TextListItem
                  primary="Hello primary text"
                  secondary="No tertiary here"
                />
                <TextListItem primary="Just primary" />
              </ListView>
              <ListView>
                <TextInput
                  label="I am a text input"
                  onChange={e => setInputValue(e.target.value)}
                />
                <TextListItem primary={`Input value: ${inputValue}`} />
                <TextInput
                  label="I am a text input that lets you change tabs"
                  enableTabSwitching
                />
                <TextInput
                  label="I am a text input with a custom input prop"
                  placeholder="Placeholder text"
                />
                <TextInput
                  label="I am a text input with an initial value"
                  initialValue="Initial text"
                />
              </ListView>
              <ListView>
                <BodyTextListItem
                  header="Header text"
                  body="body text, can support a whole lot of text"
                />
                <BodyTextListItem header="Header text, but no body" />
                <ArrowListItem
                  primary="Primary text"
                  secondary="Secondary text"
                />
                <ArrowListItem primary="Just me and arrow" />
                <Button text="Show a toast" onClick={() => { showToast(toastValues[Math.round(Math.random() * 2)], 5000) }} />
              </ListView>
            </TabView>
          </div>
        </SoftKeyProvider>
      </div>
    );
  }

  return (
    <ToastContextProvider>
      <App />
    </ToastContextProvider>
  );
}

export default App;
