
<?php
    // Function to count the number of vowels in a word
    function countVowels($word)
    {
        $vowels = ['a', 'e', 'i', 'o', 'u'];
        $count = 0;
        $word = strtolower($word);
        for ($i = 0; $i < strlen($word); $i++) {
            if (in_array($word[$i], $vowels)) {
                $count++;
            }
        }
        return $count;
    }

    // Read the words from the file provided
    $words = file('words.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    // Find the number of vowels for each word
    $vowelCounts = [];
    foreach ($words as $word) {
        $vowelCount = countVowels($word);
        if (!isset($vowelCounts[$vowelCount])) {
            $vowelCounts[$vowelCount] = [];
        }
        $vowelCounts[$vowelCount][] = $word;
    }

    // Sort the words in each vowel count category by word length
    foreach ($vowelCounts as $vowelCount => &$wordList) {
        usort($wordList, function ($a, $b) {
            return strlen($a) - strlen($b);
        });
    }
    unset($wordList);


    // Output the buttons and lists with JSON
    header('Content-Type: application/json');
    echo json_encode($vowelCounts);
?>