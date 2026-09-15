import type { Temple } from "@/_types/Temples.types";

import { ayodhyaRamTemple } from "./data/ayodhya-ram-temple";
import { badrinathTemple } from "./data/badrinath-temple";
import { bankeBihariTemple } from "./data/banke-bihari-temple";
import { brihadeeswaraTemple } from "./data/brihadeeswara-temple";
import { chamundaDeviTemple } from "./data/chamunda-devi-temple";
import { chandiDeviTempleHaridwar } from "./data/chandi-devi-temple-haridwar";
import { chintpurniDeviTemple } from "./data/chintpurni-devi-temple";
import { dwarkadhishTempleDwarka } from "./data/dwarkadhish-temple-dwarka";
import { gangotriTemple } from "./data/gangotri-temple";
import { goldenTemple } from "./data/golden-temple";
import { jwalaJiTempleHimachal } from "./data/jwala-ji-temple-himachal";
import { kaalBhairavTempleUjjain } from "./data/kaal-bhairav-temple-ujjain";
import { kainchiDham } from "./data/kainchi-dham";
import { kangraDeviTemple } from "./data/kangra-devi-temple";
import { karniMataTempleDeshnoke } from "./data/karni-mata-temple-deshnoke";
import { kashiKalabhairavTemple } from "./data/kashi-kalabhairav-temple";
import { kashiVishwanathTemple } from "./data/kashi-vishwanath-temple";
import { kedarnathTemple } from "./data/kedarnath-temple";
import { khatuShyamJiTemple } from "./data/khatu-shyam-ji-temple";
import { konarkSunTemple } from "./data/konark-sun-temple";
import { krishnaJanmabhoomiTemple } from "./data/krishna-janmabhoomi-temple";
import { mahabodhiTempleBodhgaya } from "./data/mahabodhi-temple-bodhgaya";
import { mahakaleshwarTempleUjjain } from "./data/mahakaleshwar-temple-ujjain";
import { mansaDeviTempleHaridwar } from "./data/mansa-devi-temple-haridwar";
import { mataVaishnoDeviCave } from "./data/mata-vaishno-devi-cave";
import { meenakshiAmmanTempleMadurai } from "./data/meenakshi-amman-temple-madurai";
import { mehandipurBalajiTemple } from "./data/mehandipur-balaji-temple";
import { nageshwarJyotirlingaTemple } from "./data/nageshwar-jyotirlinga-temple";
import { nainaDeviTempleHimachal } from "./data/naina-devi-temple-himachal";
import { omkareshwarJyotirlingaTemple } from "./data/omkareshwar-jyotirlinga-temple";
import { padmanabhaswamyTempleKerala } from "./data/padmanabhaswamy-temple-kerala";
import { premMandirVrindavan } from "./data/prem-mandir-vrindavan";
import { ramanathaswamyTemple } from "./data/ramanathaswamy-temple";
import { salasarBalajiTemple } from "./data/salasar-balaji-temple";
import { sanchiStupa } from "./data/sanchi-stupa";
import { shriAmarnathCave } from "./data/shri-amarnath-cave";
import { shriJagannathTemple } from "./data/shri-jagannath-temple";
import { siddhivinayakTemple } from "./data/siddhivinayak-temple";
import { somnathTemple } from "./data/somnath-temple";
import { tirupatiBalajiTemple } from "./data/tirupati-balaji-temple";
import { trimbakeshwarTempleNashik } from "./data/trimbakeshwar-temple-nashik";
import { vindhyavasiniDeviTemple } from "./data/vindhyavasini-devi-temple";
import { yamunotriTemple } from "./data/yamunotri-temple";

export const allTemples: Temple[] = [
  ayodhyaRamTemple,
  badrinathTemple,
  bankeBihariTemple,
  brihadeeswaraTemple,
  chamundaDeviTemple,
  chandiDeviTempleHaridwar,
  chintpurniDeviTemple,
  dwarkadhishTempleDwarka,
  gangotriTemple,
  goldenTemple,
  jwalaJiTempleHimachal,
  kaalBhairavTempleUjjain,
  kainchiDham,
  kangraDeviTemple,
  karniMataTempleDeshnoke,
  kashiKalabhairavTemple,
  kashiVishwanathTemple,
  kedarnathTemple,
  khatuShyamJiTemple,
  konarkSunTemple,
  krishnaJanmabhoomiTemple,
  mahabodhiTempleBodhgaya,
  mahakaleshwarTempleUjjain,
  mansaDeviTempleHaridwar,
  mataVaishnoDeviCave,
  meenakshiAmmanTempleMadurai,
  mehandipurBalajiTemple,
  nageshwarJyotirlingaTemple,
  nainaDeviTempleHimachal,
  omkareshwarJyotirlingaTemple,
  padmanabhaswamyTempleKerala,
  premMandirVrindavan,
  ramanathaswamyTemple,
  salasarBalajiTemple,
  sanchiStupa,
  shriAmarnathCave,
  shriJagannathTemple,
  siddhivinayakTemple,
  somnathTemple,
  tirupatiBalajiTemple,
  trimbakeshwarTempleNashik,
  vindhyavasiniDeviTemple,
  yamunotriTemple,
];

// Backward compatibility alias
export const temples = allTemples;

// Re-export individual temples for direct tree-shakeable imports
export {
  ayodhyaRamTemple,
  badrinathTemple,
  bankeBihariTemple,
  brihadeeswaraTemple,
  chamundaDeviTemple,
  chandiDeviTempleHaridwar,
  chintpurniDeviTemple,
  dwarkadhishTempleDwarka,
  gangotriTemple,
  goldenTemple,
  jwalaJiTempleHimachal,
  kaalBhairavTempleUjjain,
  kainchiDham,
  kangraDeviTemple,
  karniMataTempleDeshnoke,
  kashiKalabhairavTemple,
  kashiVishwanathTemple,
  kedarnathTemple,
  khatuShyamJiTemple,
  konarkSunTemple,
  krishnaJanmabhoomiTemple,
  mahabodhiTempleBodhgaya,
  mahakaleshwarTempleUjjain,
  mansaDeviTempleHaridwar,
  mataVaishnoDeviCave,
  meenakshiAmmanTempleMadurai,
  mehandipurBalajiTemple,
  nageshwarJyotirlingaTemple,
  nainaDeviTempleHimachal,
  omkareshwarJyotirlingaTemple,
  padmanabhaswamyTempleKerala,
  premMandirVrindavan,
  ramanathaswamyTemple,
  salasarBalajiTemple,
  sanchiStupa,
  shriAmarnathCave,
  shriJagannathTemple,
  siddhivinayakTemple,
  somnathTemple,
  tirupatiBalajiTemple,
  trimbakeshwarTempleNashik,
  vindhyavasiniDeviTemple,
  yamunotriTemple,
};
