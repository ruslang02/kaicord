import React, { useRef, useEffect, useContext, useState } from "react";
import Header from './KaiUI/components/Header/Header';
import { SoftKeyProvider } from './KaiUI/components/SoftKey/SoftKeyProvider';
import TabView from './KaiUI/views/TabView/TabView';
import ToastContext, { ToastContextProvider } from './KaiUI/contexts/ToastContext/ToastContext';
import IconListItem from './KaiUI/components/IconListItem/IconListItem';
import ListView from './KaiUI/views/ListView/ListView';
import ProgressBar from './KaiUI/components/ProgressBar/ProgressBar';
import TextInput from './KaiUI/components/TextInput/TextInput';
import TextListItem from './KaiUI/components/TextListItem/TextListItem';
import CheckboxListItem from './KaiUI/components/CheckboxListItem/CheckboxListItem';

import style from './App.scss';

const { Client } = require("discord.js/browser");

const ClientContext = React.createContext(null);
function App() {
	return (
		<ToastContextProvider>
			<ClientProvider>
				<TitleBar />
				<Container />
			</ClientProvider>
		</ToastContextProvider>
	)
}
function TitleBar() {
	const client = useContext(ClientContext);
	const text = client !== null ? client.user.username + "#" + client.user.discriminator : "Discord";
	return (
		<Header text={text} backgroundColor={style.blurple} />
	)
}
function ClientProvider(props) {
	const { showToast } = useContext(ToastContext);
	const [client, setClient] = useState(null);

	async function signIn() {
		let client = new Client();
		let key;
		if (navigator.getDataStores) {
			const stores = await navigator.getDataStores("discord");
			key = await stores[0].get("access_token");
		} else key = process.env.REACT_APP_TOKEN;
		await client.login(key);
		setClient(client);
		showToast("Logged in.", 2000)
	}
	if (client === null)
		signIn();

	return (
		<ClientContext.Provider value={client}>
			{props.children}
		</ClientContext.Provider>
	);
}

function Container() {
	const ref = useRef(null);
	const keys = (
		<SoftKeyProvider ref={ref}>
			<div className="content">
				<TabView tabLabels={['Messages', 'Servers', 'Settings']} focusColor={style.blurple}>
					<Messages />
					<Servers />
					<Settings />
				</TabView>
			</div>
		</SoftKeyProvider >
	);
	useEffect(() => {
		const { current } = ref;
		current.setSoftKeyTexts({
			leftText: "Exit",
			centerText: "Select",
			rightText: "Options"
		});
	});
	return keys;
}
function Messages(props) {
	const client = useContext(ClientContext);
	const [dialogs, setDialogs] = useState([]);
	const STATUS_TYPES = ["Playing", "Streaming", "Listening", "Watching"];

	function updateDialogs() {
		const channels = client.channels
			.filter(channel => channel.type === "dm")
			.first(10)
			.map(channel => {
				const { recipient } = channel;
				let presenceText = null;
				const game = recipient.presence.activities[0];
				if (game) {
					presenceText = STATUS_TYPES[game.type] + " " + game.name;
					console.log(game.type);
				}
				return (
					<IconListItem
						key={channel.id}
						primary={channel.recipient.username}
						secondary={presenceText}
						iconSrc={recipient.displayAvatarURL}
						circle={true}
						width={48}
						height={48}
						defaultColor={style.dark}
						focusColor={style.greyple}
					/>
				)
			})
		setDialogs(channels);
	}
	if (!dialogs.length)
		if (client !== null && client.user)
			updateDialogs();
	return <ActualListView isActive={props.isActive}>{dialogs}</ActualListView>;
}
function Servers(props) {
	const client = useContext(ClientContext);
	const [servers, setServers] = useState([]);

	function updateDialogs() {
		const guilds = client.guilds
			.first(10)
			.map(guild => {
				return (
					<IconListItem
						key={guild.id}
						primary={guild.name}
						secondary={guild.memberCount + " members"}
						iconSrc={guild.iconURL}
						circle={true}
						width={48}
						height={48}
						defaultColor={style.dark}
						focusColor={style.greyple}
					/>
				)
			})
		setServers(guilds);
	}
	if (!servers.length)
		if (client !== null && client.user)
			updateDialogs();
	return <ActualListView isActive={props.isActive}>{servers}</ActualListView>;
}
function ActualListView(props) {
	let content = props.children;
	console.log(content);
	if (content == null || content.length === 0)
		return null;
	/*content = [
			<ProgressBar key="progress"
				header={'Loading...'}
				percentage={100}
				type={'download'}
				focusColor={style.greyple}
				defaultColor={style.dark}
			/>,
			<TextListItem key="cancel" primary="Cancel"
				defaultColor={style.dark}
				focusColor={style.greyple}  />
		];*/
	if (content.length === 1)
		return null;
	/*content = [
		...content,
		<TextListItem key="cancel" primary="Cancel"
			defaultColor={style.dark}
			focusColor={style.greyple} />

	];*/
	return <ListView isActive={props.isActive}>{content}</ListView>
}
function Settings(props) {
	const client = useContext(ClientContext);

	async function handleChange(e) {
		if (navigator.getDataStores) {
			const stores = await navigator.getDataStores("discord");
			await stores[0].put("access_token", e.target.value);
		};
	}

	return (
		<ActualListView isActive={props.isActive}>
			<TextInput
				label="Discord Token"
				onChange={handleChange}
				placeholder="Obtained in official Discord client"
			/>
			<CheckboxListItem
				primary="Compact view"
				initCheckboxVal={true}
				onInputChange={() => { }}
				checkboxSide={"left"} />
		</ActualListView>
	)
}
export default App;