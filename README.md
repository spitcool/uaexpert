# United Airlines Expert Mode Enhancement Script

## What does it do? 

This script, when coupled with expert mode on United's web site, will highlight fare buckets that are important to a UA frequent flier. 

## What are the technical requirements to use this? 

You'll need Greasemonkey, Tampermonkey, or a similar browser extension that allows you to run javascript on pages.

## I fly with United and I need to see upgrade availability. What do I need to do? 

Well, first you'll need to be someone that has PlusPoints to use, or someone that will be the recipient of PlusPoints. Next, you'll need to be logged into a United account on their website and have Expert Mode enabled. 

You can enable Expert Mode on this page when logged in: https://www.united.com/en/us/account/preferences?accordion=0. 

## What fare buckets are important? 

This script highlights PN (GS Upgrades), PZ (Non-GS Upgrades), and T (GS Saver Award Conversion). There are plenty of other buckets that can be important to a flyer. Feel free to modify the script on your own machine to highlight fare buckets that you are interested in. For now, I plan to keep PN, PZ, and T the primary buckets that are highlighted here.

For more information on fare buckets, check out https://cwsi.net/united.htm

## What should I not do with this? 

This tool is for individual use only. Please do not abuse the information that is readily provided by United in an automated fashion as that will almost certainly lead to United making it more difficult to use or removing the feature altogether. See https://liveandletsfly.com/the-real-reason-united-is-blocking-award-and-upgrade-space-from-expert-flyer/ for what this looks like when abused. 

## Known Issues
The tool does not differentiate between UA and non-UA flights. As an example, T9 will be highlighted green regardless of the airline operating the flight. As someone using this tool, you should be able to understand why this is important to pay attention to. 
