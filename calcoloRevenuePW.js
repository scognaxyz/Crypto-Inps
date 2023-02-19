
const Adopters = "People adopted cryptocurrency"
const Investor = "People invested in fund retirement"

const italyPopulation2023 = 59110000;
const percentageCryptoAdoptersItaly2023 = 2.4/100;// https://triple-a.io/crypto-ownership-data/
const percentageCryptoAdoptersWorldWide2023 = 4.2/100; // https://triple-a.io/crypto-ownership-data/
const percentageAnnualGrowthWorlWideAdopters = 50/100; // https://triple-a.io/crypto-ownership-data/
const percentageAnnualGrowthItalyAdopters = percentageAnnualGrowthWorlWideAdopters * percentageCryptoAdoptersItaly2023 / percentageCryptoAdoptersWorldWide2023


const percentageUnder34WorldWideAdopters = 72/100;// https://triple-a.io/crypto-ownership-data/
const percentageUnder34World = 25;// https://www.tuttitalia.it/statistiche/popolazione-eta-sesso-stato-civile-2019/
const percentageUnder34Italy = 20.5;//https://data.worldbank.org/
const percentageUnder34ItalyAdopters = percentageUnder34WorldWideAdopters*percentageUnder34Italy/percentageUnder34World;

const percentageFundRetirementInvestorItaly2022 = (8.3 - 2.3)*1000000 /italyPopulation2023//https://www.covip.it/sites/default/files/relazioneannuale/relazione_per_lanno_2021_0.pdf
const percentageAnnualGrowthFundRetirementInvestor = 7/100 //https://www.ivass.it/pubblicazioni-e-statistiche/statistiche/bollettino-statistico/2022/n_15_2022/BollStat_Premi_2Q2022.pdf



const annualIncomeCryptoAdopterWorld = 25000; // https://triple-a.io/crypto-ownership-data/
const annuaIncomeItaly = 35657.5;//https://data.worldbank.org/
const annualIncomeWorldWide = 12234.8;//https://data.worldbank.org/
const annualIncomeCryptoAdopterItaly = annualIncomeCryptoAdopterWorld*annuaIncomeItaly/annualIncomeWorldWide;
const annualContributeFundRetirementUnder35 = 2980/2;// https://www.covip.it/sites/default/files/relazioneannuale/relazione_per_lanno_2021_0.pdf
const percentageHighRiskInvestor = 30/100 // estimation
const annualContributeFundRetirementAdopter = annualContributeFundRetirementUnder35*percentageHighRiskInvestor*annualIncomeCryptoAdopterItaly/annuaIncomeItaly//The average income of crypto supporters is twice as high as the average Italian income

const annualRevenueForPartecipants = 2/100 // file:///Users/rick/Downloads/nota-informativa_fpa-marzo-2022-scheda-i-costi-per-adesioni-collettive.pdf
const annualRendimentoForPartecipants = 10/100 // Estimation based on S&P500 https://www.fool.com/investing/how-to-invest/index-funds/average-return/#:~:text=Over%20the%20past%2030%20years,rate%20of%2010.7%25%20per%20year

const marketShare = 5/100// estimation
const annualGrowthMarketShare = 2/100 //estimation

let  cryptoAdoptersItalyInYears= []
let anni = []

function cryptoAdoptersItalyINCREMENTATION(years) {
    anni.length = years
    let cryptoAdoptersItaly = italyPopulation2023*percentageCryptoAdoptersItaly2023
    cryptoAdoptersItalyInYears.push((cryptoAdoptersItaly))
    let cryptoAdoptersItalyYeari
    for(let i=0; i < (anni.length -1);i++){
        cryptoAdoptersItalyYeari = cryptoAdoptersItaly*percentageAnnualGrowthItalyAdopters;
        cryptoAdoptersItaly = cryptoAdoptersItaly + cryptoAdoptersItalyYeari;
        cryptoAdoptersItalyInYears.push((cryptoAdoptersItaly));
    }
}

let  fundRetirementInvestorInYears= []

function fundRetirementInvestorINCREMENTATION(years) {
    anni.length = years
    let percentageFundRetirementInvestorItaly = percentageFundRetirementInvestorItaly2022
    fundRetirementInvestorInYears.push((percentageFundRetirementInvestorItaly))
    let percentageFundRetirementInvestorItalyYeari
    for(let i=0; i < (anni.length-1);i++){
        percentageFundRetirementInvestorItalyYeari = percentageFundRetirementInvestorItaly*percentageAnnualGrowthFundRetirementInvestor;
        percentageFundRetirementInvestorItaly = percentageFundRetirementInvestorItaly + percentageFundRetirementInvestorItalyYeari;
        fundRetirementInvestorInYears.push((percentageFundRetirementInvestorItaly));
    }
}

let revenueForPartecipantsInYears = []
function revenueForPartecipantsINCREMENTATION(years) {
    anni.length = years
    let annualContribute = annualContributeFundRetirementAdopter
    let annualContributei
    let revenueForPartecipants
    for(let i=0; i < (anni.length);i++){
        annualContributei = annualContribute*annualRendimentoForPartecipants;
        annualContribute = annualContribute + annualContributei;
        revenueForPartecipants = annualContribute * annualRevenueForPartecipants;
        annualContribute = annualContribute - revenueForPartecipants;
        revenueForPartecipantsInYears.push((revenueForPartecipants));
    }
}

let marketShareInYears = []
function marketShareINCREMENTATION(years) {
    anni.length = years
    let marketShare_ = marketShare
    marketShareInYears.push((marketShare_));
    for(let i=0; i < (anni.length-1);i++){
        marketShare_ = marketShare_ + annualGrowthMarketShare;
        marketShareInYears.push((marketShare_));
    }
}

let years = 20
cryptoAdoptersItalyINCREMENTATION(years);
fundRetirementInvestorINCREMENTATION(years);
revenueForPartecipantsINCREMENTATION(years);
marketShareINCREMENTATION(years)

let customersInYears = []
function customer(years) {
    anni.length = years
    let revenuei
    for(let i=0; i < anni.length;i++){

        if (i>0){
        revenuei = (cryptoAdoptersItalyInYears[i] - cryptoAdoptersItalyInYears[i-1] )*percentageUnder34ItalyAdopters*fundRetirementInvestorInYears[i]*marketShareInYears[i]
        customersInYears.push((revenuei))
        } else {
            revenuei = cryptoAdoptersItalyInYears[i] *percentageUnder34ItalyAdopters*fundRetirementInvestorInYears[i]*marketShareInYears[i]
            customersInYears.push((revenuei))
        }
    } 
}
customer(years)

let revenueTotalInYears = []
function revenueTotalINCREMENTATION(years) {
    anni.length = years
    let revenue_ = 0
    let revenuei = 0
    let revenuex
    
    for(let i=0; i < anni.length;i++){
        
        for(x=0; x<i+1; x++){
            revenuex = customersInYears[i-x]*revenueForPartecipantsInYears[x]
            revenuei = revenuei + revenuex
        }
        revenue_ = revenue_ + revenuei
        revenueTotalInYears.push((revenue_))
    }
}
revenueTotalINCREMENTATION(years)
console.log("Crypro adopters over the years =", annualContributeFundRetirementAdopter)
console.log("Crypro adopters over the years =", cryptoAdoptersItalyInYears)
console.log("Fund retirement investor over the years =", fundRetirementInvestorInYears)
console.log("Revenue for partecipants over the years", revenueForPartecipantsInYears)
console.log("Market share over the years", marketShareInYears)
console.log("Partecipants over the years)",customersInYears)
console.log("Total Revenue over the years)",revenueTotalInYears)