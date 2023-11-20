# Inclusion Bot

![nobg](media/nobg.png)

## Inspiration
In an increasingly diverse era on the internet, we still struggle with inclusion in online spaces. Our project is informed by our individual lived experiences as minorities online, including having to brush off microaggressions on social media platforms.

## Discord Bot
Our Discord bot serves as a vigilant guardian against hateful messages within your server. Using advanced algorithms, it scans messages in real-time, detecting any content that may be offensive or harmful. If a message is flagged, the bot takes immediate action by deleting the content and privately messaging the user, providing them with constructive feedback about the nature of their message. This proactive approach not only removes harmful content swiftly but also educates users about the importance of fostering a positive and inclusive space.

## Full-Stack Website
Complementing the Discord bot, our full-stack website offers users a proactive tool to analyze their own messages before sharing them. Visitors can input text, whether it's a single sentence or an entire paragraph, and our website will analyze the content for potential hateful elements. This feature empowers users to self-monitor and adjust their language to contribute positively to the community.

## How we built it
We built the two components of our project in collaboration with one another, using the Discord JS API, for the bot, as well as a React and Express tech stack for our website. We utilized the Cohere API to parse messages and submitted string, after training it on data from [Vidgen et al. 2021](https://github.com/bvidgen/Dynamically-Generated-Hate-Speech-Dataset)

## Accomplishments that we're proud of
We are proud of it all. We are especially proud of the fact that our bot is truly smart, and can often tell when something is hateful or isn't, based on nuances in the message. This allows people to critique hateful sentiments without themselves being identified as hateful, thus encouraging positive, inclusive and diverse discussion.
