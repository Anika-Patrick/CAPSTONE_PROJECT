import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FitnessService } from '../services/fitness';

@Component({
  selector: 'app-yoga',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './yoga.page.html',
  styleUrls: ['./yoga.page.scss']
})
export class YogaPage implements OnInit {

  constructor(public fitness: FitnessService) {}

  // ================= STATE =================
  selectedCategory: string = 'PCOD';
  selectedLevel: string = 'Beginner';
  todayYogaText: string = '';

  levels = ['Beginner', 'Moderate', 'Advanced'];

  isYogaMode = false;
  currentAsanaIndex = 0;
  timeLeft = 30;
  breaths = 10;
  yogaTimer: any;

  completedAsanas = 0;
  totalAsanas = 0;

  // ================= YOGA CATEGORIES =================
  categories = [
    { name: 'PCOD', emoji: '🌸' },
    { name: 'Sleep', emoji: '😴' },
    { name: 'Stress Relief', emoji: '🧘' },
    { name: 'Weight Loss', emoji: '🔥' },
    { name: 'Back Pain', emoji: '💆' },
    { name: 'Flexibility', emoji: '🤸' },
    { name: 'Anxiety', emoji: '🌿' },
    { name: 'Meditation', emoji: '☮️' }
  ];

  filteredCategories: any[] = [];

  // ================= DAILY YOGA =================
  getTodayYoga() {
    const day = new Date().getDay();

    const plan: any = {
      0: { text: '🌿 Meditation Day', parts: ['Meditation'] },
      1: { text: '🌸 PCOD Healing', parts: ['PCOD'] },
      2: { text: '😴 Better Sleep', parts: ['Sleep'] },
      3: { text: '🧘 Stress Relief', parts: ['Stress Relief'] },
      4: { text: '🔥 Fat Burn Yoga', parts: ['Weight Loss'] },
      5: { text: '💆 Back Pain Relief', parts: ['Back Pain'] },
      6: { text: '🤸 Full Body Flexibility', parts: ['Flexibility'] }
    };

    const today = plan[day];
    this.todayYogaText = today.text;

    this.filteredCategories = this.categories.filter(c =>
      today.parts.includes(c.name)
    );
  }

  // ================= CATEGORY GIFS =================
 categoryGifs: any = {
  'PCOD': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiUTqBYizqW7GTPyjep0JupxSJPZ-6qxkXmA&s',

  'Sleep': 'https://img.favpng.com/25/17/23/sleep-cartoon-animation-clip-art-png-favpng-vY1ZQcWy8grZ73FFc1NcFpunT.jpg',

  'Stress Relief': 'https://static.vecteezy.com/system/resources/previews/042/113/887/non_2x/meditating-girl-female-becalmed-character-in-yoga-lotus-posture-stress-relief-and-meditation-practice-flat-illustration-set-healthy-lifestyle-meditation-cartoon-concept-vector.jpg',

  'Weight Loss': 'https://previews.123rf.com/images/dmitrynew/dmitrynew2007/dmitrynew200700087/152111564-weight-loss-before-and-after-cartoon-fat-and-thin-woman-comparsion-vector-fitness-or-diet.jpg',

  'Back Pain': 'https://www.shutterstock.com/shutterstock/photos/2071984802/display_1500/stock-vector-suffering-from-chronic-back-pain-concept-young-woman-standing-holding-her-lower-back-suffering-2071984802.jpg',

  'Flexibility': 'https://previews.123rf.com/images/logo3in1/logo3in11510/logo3in1151000005/46717149-woman-sitting-to-cool-down-stretches-after-exercise.jpg',

  'Anxiety': 'https://thumbs.dreamstime.com/b/woman-fears-phobias-anxiety-despair-pain-anxiety-woman-fears-phobias-thoughts-get-confused-crushed-isolated-girl-203608015.jpg',

  'Meditation': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ9_Tl1kIBLOQXAZ6Thod1BD8rq5uRGb13kQ&s'
};

  // ================= ASANA GIFS =================
  asanaGifs: any = {

    // ================= PCOD =================
    'Butterfly Pose': 'https://www.shutterstock.com/image-vector/woman-doing-seated-butterfly-pose-260nw-2187437167.jpg',
    'Cobra Pose': 'https://www.shutterstock.com/image-vector/woman-training-yoga-asana-cobra-600nw-2277302037.jpg',
    'Cat Cow Pose': 'https://media.istockphoto.com/id/1094565462/vector/woman-doing-exercise-with-cat-cow-pose-to-stretch-back-muscle-and-promote-spinal-flexibility.jpg?s=612x612&w=0&k=20&c=edxRjFsiKWo3ZOnZxcSOorlayT9Obzalg9uSN_DQSgU=',
    'Child Pose': 'https://www.shutterstock.com/image-vector/woman-child-pose-flat-yoga-600nw-2657571339.jpg',
    'Bridge Pose': 'https://www.shutterstock.com/image-vector/young-woman-perfoming-bridge-pose-600nw-2278699905.jpg',

    // ================= SLEEP =================
    'Legs Up Wall': 'https://www.shutterstock.com/image-vector/legs-wall-bolster-yoga-pose-260nw-2001858446.jpg',
    'Corpse Pose': 'https://cdni.iconscout.com/illustration/premium/thumb/corpse-pose-illustration-svg-download-png-2965776.png',
    'Happy Baby Pose': 'https://t4.ftcdn.net/jpg/10/30/93/61/360_F_1030936171_06ex7TfCSLY548JpQ7gfhd1WZx0mLtae.jpg',
    'Forward Fold': 'https://www.shutterstock.com/image-vector/upward-forward-fold-half-standing-260nw-2412140057.jpg',
    'Supine Twist': 'https://www.shutterstock.com/image-vector/girl-sitting-half-spinal-twist-260nw-1622224627.jpg',

    // ================= STRESS =================
    'Lotus Pose': 'https://i.pinimg.com/736x/8d/8d/a4/8d8da474e3f6a09f27e501e3680e3ff9.jpg',
    'Tree Pose': 'https://png.pngtree.com/png-clipart/20221025/original/pngtree-cartoon-yoga-tree-pose-png-image_8719055.png',
    'Seated Forward Bend': 'https://thumbs.dreamstime.com/b/forward-bend-yoga-pose-exercise-body-stretch-fitness-forward-bend-yoga-pose-exercise-body-stretch-fitness-workout-161160740.jpg',
    'Mountain Pose': 'https://thumbs.dreamstime.com/b/flat-vector-illustration-young-woman-performing-mountain-pose-her-arms-raised-yoga-practice-session-young-432921559.jpg',
    'Easy Pose': 'https://thumbs.dreamstime.com/b/cartoon-woman-easy-pose-yoga-position-wellness-meditation-illustration-sitting-376262031.jpg',

    // ================= WEIGHT LOSS =================
    'Boat Pose': 'https://static.vecteezy.com/system/resources/previews/022/444/361/non_2x/plump-woman-doing-yoga-meditating-fat-active-exercise-for-balance-weight-loss-flat-graphics-vector.jpg',
    'Plank Pose': 'https://www.shutterstock.com/image-vector/plank-pose-kumbhakasana-beautiful-girl-260nw-2112202385.jpg',
    'Warrior Pose': 'https://cdn.vectorstock.com/i/1000v/06/64/woman-practicing-yoga-warrior-pose-outdoors-under-vector-58610664.jpg',
    'Chair Pose': 'https://static.vecteezy.com/system/resources/previews/028/242/485/non_2x/woman-practicing-chair-pose-utkatasana-yoga-exercise-vector.jpg',
    'Bow Pose': 'https://www.shutterstock.com/image-vector/young-woman-perfoming-yoga-exercise-260nw-2290312461.jpg',

    // ================= BACK PAIN =================
    'Sphinx Pose': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMdfojf95J0_zCMgibBMMX-ehwGwI4jomuWA&s',
    'Downward Dog': 'https://png.pngtree.com/png-clipart/20210516/original/pngtree-downward-facing-dog-pose-yoga-png-image_6292116.png',
    'Thread Needle Pose': 'https://www.shutterstock.com/image-vector/thread-needle-pose-young-woman-260nw-2418860655.jpg',
    'Puppy Pose': 'https://img.freepik.com/premium-vector/puppy-pose-young-woman-practicing-yoga-pose-woman-workout-fitness-aerobic-exercise_476141-2685.jpg?w=360',
    'Triangle Pose': 'https://static.vecteezy.com/system/resources/previews/005/311/073/non_2x/woman-doing-extended-triangle-pose-or-utthita-trikonasana-exercise-flat-illustration-isolated-on-white-background-free-vector.jpg',

    // ================= FLEXIBILITY =================
    'Camel Pose': 'https://thumbs.dreamstime.com/b/woman-standing-camel-yoga-pose-stretch-exercise-woman-standing-camel-yoga-pose-stretch-exercise-body-health-158160732.jpg',
    'Split Stretch': 'https://img.freepik.com/premium-vector/girl-is-exercising-with-her-hands_118167-10586.jpg',
    'Wide Leg Fold': 'https://thumbs.dreamstime.com/b/woman-doing-intense-leg-stretch-pose-d-wide-legged-forward-fold-pose-d-woman-doing-intense-leg-stretch-pose-d-wide-legged-forward-255520764.jpg',
    'Lizard Pose': 'https://cdni.iconscout.com/illustration/premium/thumb/girl-doing-lizard-pose-yoga-illustration-svg-download-png-7629580.png',
    'King Pigeon Pose': 'https://static.vecteezy.com/system/resources/previews/066/606/089/non_2x/woman-doing-one-legged-king-pigeon-pose-illustration-vector.jpg',

    // ================= ANXIETY =================
    'Breathing Pose': 'https://media.istockphoto.com/id/1437408403/vector/woman-practicing-breathing-exercise-in-flat-design-on-white-background.jpg?s=612x612&w=0&k=20&c=d1zTqFnrTVWLmqy9VEAWYPY1O9GFeEBe4Ely6zMvvNw=',
    'Moon Pose': 'https://thumbs.dreamstime.com/b/woman-doing-half-moon-pose-ardha-chandrasana-exercise-woman-doing-half-moon-pose-ardha-chandrasana-exercise-flat-vector-246510924.jpg',
    'Garland Pose': 'https://www.yogaclassplan.com/wp-content/uploads/2021/06/10-garland-pose.jpg',
    'Fish Pose': 'https://cdn.prod.website-files.com/683b218dcc58f93d54ce8e1d/69a185d6ba86e27084004bda_matsyasana_2x.webp',
    'Standing Forward Fold': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvgLenqhWVcOrNCc3HoFouHuWPQH5dJ-78XQ&s',

    // ================= MEDITATION =================
    'Zen Pose': 'https://static.vecteezy.com/system/resources/thumbnails/053/447/781/small/yoga-and-spiritual-practice-woman-meditating-relaxing-peaceful-female-during-meditation-in-lotus-pose-illustration-isolated-on-white-background-vector.jpg',
    'Pranayama': 'https://img.freepik.com/free-photo/women-enjoying-mental-health_23-2151904398.jpg?semt=ais_hybrid&w=740&q=80',
    'Alternate Nostril Breathing': 'https://img.freepik.com/premium-vector/illustration-woman-doing-yoga-parvatasana-position_207579-960.jpg',
    'Mindfulness Pose': 'https://img.freepik.com/premium-vector/vector-cartoon-illustration-yoga-pose-utthita-parshvakonasana_194552-1109.jpg',
    'Deep Relaxation': 'https://img.freepik.com/premium-vector/meditating-woman-lotus-position-relaxation-tranquility_1031747-188.jpg'
  };

  onGifError(event: any) {
    event.target.src =
      'https://cdn-icons-png.flaticon.com/512/1048/1048941.png';
  }

  // ================= YOGA WORKOUTS =================
  yogaExercises: any = {

   

  // ================= PCOD =================
  PCOD: {
    Beginner: [
      {
        name: 'Butterfly Pose',
        breaths: 10,
        time: 40,
        desc: 'Helps improve pelvic blood flow and reduces menstrual discomfort.'
      },
      {
        name: 'Cat Cow Pose',
        breaths: 10,
        time: 45,
        desc: 'Improves spine flexibility and regulates hormonal balance.'
      },
      {
        name: 'Cobra Pose',
        breaths: 8,
        time: 40,
        desc: 'Strengthens reproductive organs and reduces stress in abdomen.'
      },
      {
        name: 'Child Pose',
        breaths: 10,
        time: 50,
        desc: 'Relaxes the nervous system and reduces fatigue.'
      },
      {
        name: 'Bridge Pose',
        breaths: 8,
        time: 45,
        desc: 'Stimulates thyroid and improves hormonal activity.'
      }
    ],

    Moderate: [
      {
        name: 'Butterfly Pose (Deep Hold)',
        breaths: 15,
        time: 60,
        desc: 'Improves hip flexibility and hormonal regulation.'
      },
      {
        name: 'Bridge Pose',
        breaths: 15,
        time: 60,
        desc: 'Enhances pelvic circulation and reduces PCOD symptoms.'
      },
      {
        name: 'Cobra Pose',
        breaths: 12,
        time: 55,
        desc: 'Boosts metabolism and relieves lower back stiffness.'
      },
      {
        name: 'Seated Forward Bend',
        breaths: 12,
        time: 60,
        desc: 'Calms mind and improves digestion.'
      },
      {
        name: 'Cat Cow Flow',
        breaths: 15,
        time: 60,
        desc: 'Balances hormones and improves spinal movement.'
      }
    ],

    Advanced: [
      {
        name: 'Bridge Pose Hold',
        breaths: 20,
        time: 75,
        desc: 'Deep hormonal stimulation and pelvic strengthening.'
      },
      {
        name: 'Cobra Flow',
        breaths: 20,
        time: 70,
        desc: 'Improves energy flow and reduces stress hormones.'
      },
      {
        name: 'Butterfly Pulse',
        breaths: 20,
        time: 70,
        desc: 'Advanced hip opening for reproductive health.'
      },
      {
        name: 'Child Pose Deep Relax',
        breaths: 20,
        time: 80,
        desc: 'Deep nervous system reset and emotional balance.'
      },
      {
        name: 'Cat Cow Extended Flow',
        breaths: 20,
        time: 75,
        desc: 'Improves spine mobility and hormone balance.'
      }
    ]
  },

  // ================= SLEEP =================
  Sleep: {
    Beginner: [
      {
        name: 'Legs Up Wall',
        breaths: 8,
        time: 60,
        desc: 'Improves blood circulation and relaxes nervous system.'
      },
      {
        name: 'Corpse Pose',
        breaths: 10,
        time: 90,
        desc: 'Deep relaxation for mental calmness and sleep.'
      },
      {
        name: 'Happy Baby Pose',
        breaths: 10,
        time: 60,
        desc: 'Releases lower back tension and stress.'
      },
      {
        name: 'Forward Fold',
        breaths: 8,
        time: 60,
        desc: 'Calms brain and reduces anxiety.'
      },
      {
        name: 'Supine Twist',
        breaths: 8,
        time: 60,
        desc: 'Releases spinal tension and aids digestion.'
      }
    ],

    Moderate: [
      {
        name: 'Corpse Pose Deep',
        breaths: 15,
        time: 120,
        desc: 'Deep meditation posture for insomnia relief.'
      },
      {
        name: 'Legs Up Wall Hold',
        breaths: 15,
        time: 90,
        desc: 'Reduces fatigue and improves sleep quality.'
      },
      {
        name: 'Supine Twist Hold',
        breaths: 12,
        time: 80,
        desc: 'Relieves tension before sleep.'
      },
      {
        name: 'Forward Fold Relax',
        breaths: 15,
        time: 80,
        desc: 'Improves oxygen flow to brain.'
      },
      {
        name: 'Happy Baby Relax',
        breaths: 12,
        time: 70,
        desc: 'Releases emotional stress from hips.'
      }
    ],

    Advanced: [
      {
        name: 'Yoga Nidra',
        breaths: 25,
        time: 180,
        desc: 'Deep sleep meditation technique.'
      },
      {
        name: 'Corpse Pose Extended',
        breaths: 20,
        time: 150,
        desc: 'Full body relaxation for deep sleep.'
      },
      {
        name: 'Legs Up Wall Advanced',
        breaths: 20,
        time: 120,
        desc: 'Boosts recovery and sleep hormone balance.'
      },
      {
        name: 'Supine Twist Deep',
        breaths: 20,
        time: 100,
        desc: 'Deep spinal relaxation before sleep.'
      },
      {
        name: 'Breathing Savasana',
        breaths: 20,
        time: 120,
        desc: 'Breath control for mental shutdown.'
      }
    ]
  },

  // ================= STRESS RELIEF =================
  'Stress Relief': {
    Beginner: [
      {
        name: 'Mountain Pose',
        breaths: 10,
        time: 40,
        desc: 'Improves posture and mental stability.'
      },
      {
        name: 'Child Pose',
        breaths: 10,
        time: 50,
        desc: 'Calms nervous system instantly.'
      },
      {
        name: 'Tree Pose',
        breaths: 8,
        time: 45,
        desc: 'Improves focus and balance.'
      },
      {
        name: 'Easy Pose',
        breaths: 10,
        time: 40,
        desc: 'Basic meditation posture for calmness.'
      },
      {
        name: 'Lotus Prep Pose',
        breaths: 10,
        time: 45,
        desc: 'Prepares mind for meditation.'
      }
    ],

    Moderate: [
      {
        name: 'Tree Pose Balance',
        breaths: 12,
        time: 60,
        desc: 'Improves concentration and mental control.'
      },
      {
        name: 'Seated Forward Bend',
        breaths: 12,
        time: 60,
        desc: 'Reduces stress and anxiety.'
      },
      {
        name: 'Lotus Pose',
        breaths: 15,
        time: 70,
        desc: 'Deep meditation posture for inner peace.'
      },
      {
        name: 'Mountain Flow',
        breaths: 12,
        time: 60,
        desc: 'Grounding posture for stability.'
      },
      {
        name: 'Child Pose Relax',
        breaths: 12,
        time: 60,
        desc: 'Releases emotional stress.'
      }
    ],

    Advanced: [
      {
        name: 'Lotus Meditation',
        breaths: 20,
        time: 120,
        desc: 'Deep meditative state for stress release.'
      },
      {
        name: 'Tree Pose Hold',
        breaths: 20,
        time: 90,
        desc: 'Advanced balance and focus training.'
      },
      {
        name: 'Seated Forward Bend Deep',
        breaths: 18,
        time: 100,
        desc: 'Deep emotional and physical release.'
      },
      {
        name: 'Mountain Stillness',
        breaths: 20,
        time: 90,
        desc: 'Mental grounding and stability.'
      },
      {
        name: 'Zen Sitting Pose',
        breaths: 20,
        time: 120,
        desc: 'Deep awareness and mindfulness practice.'
      }
    ]
  },

  // ================= NEW CATEGORY: WEIGHT LOSS YOGA =================


  // ================= WEIGHT LOSS =================
  WeightLoss: {
    Beginner: [
      { name: 'Sun Salutation A', breaths: 10, time: 60, desc: 'Full body warm-up to burn calories.' },
      { name: 'Chair Pose', breaths: 8, time: 40, desc: 'Strengthens thighs and burns fat.' },
      { name: 'High Plank', breaths: 10, time: 45, desc: 'Core activation and fat burn.' },
      { name: 'Forward Bend', breaths: 10, time: 40, desc: 'Improves digestion.' },
      { name: 'Mountain Pose', breaths: 10, time: 30, desc: 'Posture and balance.' }
    ],
    Moderate: [
      { name: 'Warrior II', breaths: 12, time: 60, desc: 'Strength + calorie burn.' },
      { name: 'Boat Pose', breaths: 12, time: 50, desc: 'Core fat reduction.' },
      { name: 'Chair Twist', breaths: 12, time: 55, desc: 'Improves metabolism.' },
      { name: 'Lunge Flow', breaths: 12, time: 60, desc: 'Leg strength + fat burn.' },
      { name: 'Plank Flow', breaths: 15, time: 60, desc: 'Full body activation.' }
    ],
    Advanced: [
      { name: 'Sun Salutation B', breaths: 20, time: 90, desc: 'High intensity fat burn.' },
      { name: 'Crow Pose', breaths: 15, time: 60, desc: 'Core + balance strength.' },
      { name: 'Side Plank', breaths: 15, time: 60, desc: 'Oblique fat burn.' },
      { name: 'Jump Back Flow', breaths: 20, time: 80, desc: 'Explosive calorie burn.' },
      { name: 'Warrior Flow', breaths: 20, time: 90, desc: 'Full body conditioning.' }
    ]
  },

  // ================= BACK PAIN =================
  BackPain: {
    Beginner: [
      { name: 'Cat Cow Pose', breaths: 10, time: 45, desc: 'Spine mobility.' },
      { name: 'Child Pose', breaths: 10, time: 50, desc: 'Back relaxation.' },
      { name: 'Pelvic Tilt', breaths: 10, time: 40, desc: 'Lower back strength.' },
      { name: 'Knee to Chest', breaths: 10, time: 45, desc: 'Releases tension.' },
      { name: 'Cobra Pose', breaths: 8, time: 40, desc: 'Spine flexibility.' }
    ],
    Moderate: [
      { name: 'Bridge Pose', breaths: 12, time: 60, desc: 'Back strengthening.' },
      { name: 'Sphinx Pose', breaths: 12, time: 50, desc: 'Gentle extension.' },
      { name: 'Seated Twist', breaths: 12, time: 55, desc: 'Spinal release.' },
      { name: 'Downward Dog', breaths: 12, time: 60, desc: 'Full back stretch.' },
      { name: 'Locust Pose', breaths: 12, time: 55, desc: 'Lower back strength.' }
    ],
    Advanced: [
      { name: 'Wheel Pose', breaths: 20, time: 70, desc: 'Deep spine flexibility.' },
      { name: 'Bow Pose', breaths: 20, time: 70, desc: 'Full back strength.' },
      { name: 'Cobra Flow', breaths: 20, time: 75, desc: 'Advanced spine mobility.' },
      { name: 'King Cobra', breaths: 20, time: 80, desc: 'Deep backbend.' },
      { name: 'Bridge Hold', breaths: 20, time: 75, desc: 'Lower back power.' }
    ]
  },

  // ================= FLEXIBILITY =================
  Flexibility: {
    Beginner: [
      { name: 'Butterfly Pose', breaths: 10, time: 40, desc: 'Hip opening.' },
      { name: 'Forward Bend', breaths: 10, time: 45, desc: 'Hamstring stretch.' },
      { name: 'Cat Cow', breaths: 10, time: 45, desc: 'Spine flexibility.' },
      { name: 'Child Pose', breaths: 10, time: 50, desc: 'Relaxation stretch.' },
      { name: 'Neck Rolls', breaths: 10, time: 30, desc: 'Neck mobility.' }
    ],
    Moderate: [
      { name: 'Pigeon Pose', breaths: 12, time: 60, desc: 'Deep hip opening.' },
      { name: 'Lunge Stretch', breaths: 12, time: 55, desc: 'Hip flexibility.' },
      { name: 'Downward Dog', breaths: 12, time: 60, desc: 'Full body stretch.' },
      { name: 'Seated Twist', breaths: 12, time: 55, desc: 'Spinal rotation.' },
      { name: 'Cobra Pose', breaths: 12, time: 50, desc: 'Spine stretch.' }
    ],
    Advanced: [
      { name: 'King Pigeon', breaths: 20, time: 75, desc: 'Advanced hip flexibility.' },
      { name: 'Wheel Pose', breaths: 20, time: 70, desc: 'Deep backbend.' },
      { name: 'Splits Stretch', breaths: 20, time: 80, desc: 'Extreme flexibility.' },
      { name: 'Forearm Stand Prep', breaths: 20, time: 70, desc: 'Balance + flexibility.' },
      { name: 'Deep Backbend Flow', breaths: 20, time: 80, desc: 'Full spine mobility.' }
    ]
  },

  // ================= MEDITATION =================
  Meditation: {
    Beginner: [
      { name: 'Breath Awareness', breaths: 10, time: 300, desc: 'Focus on breathing.' },
      { name: 'Body Scan', breaths: 10, time: 300, desc: 'Relax body parts.' },
      { name: 'Mantra Chanting', breaths: 10, time: 300, desc: 'Calms mind.' },
      { name: 'Mindful Sitting', breaths: 10, time: 300, desc: 'Focus training.' },
      { name: 'Gratitude Meditation', breaths: 10, time: 300, desc: 'Positive thinking.' }
    ],
    Moderate: [
      { name: 'Focused Breath Count', breaths: 15, time: 600, desc: 'Improves concentration.' },
      { name: 'Visualization Meditation', breaths: 15, time: 600, desc: 'Mental clarity.' },
      { name: 'Sound Awareness', breaths: 15, time: 600, desc: 'Deep awareness.' },
      { name: 'Walking Meditation', breaths: 15, time: 600, desc: 'Mindful movement.' },
      { name: 'Mantra Repetition', breaths: 15, time: 600, desc: 'Deep focus.' }
    ],
    Advanced: [
      { name: 'Silent Meditation', breaths: 20, time: 900, desc: 'Deep mental silence.' },
      { name: 'Chakra Meditation', breaths: 20, time: 900, desc: 'Energy alignment.' },
      { name: 'Advanced Breath Control', breaths: 20, time: 900, desc: 'Mind mastery.' },
      { name: 'Deep Visualization', breaths: 20, time: 900, desc: 'Inner awareness.' },
      { name: 'Detachment Practice', breaths: 20, time: 900, desc: 'Mental freedom.' }
    ]
  },

  // ================= ANXIETY =================
  Anxiety: {
    Beginner: [
      { name: 'Deep Breathing', breaths: 10, time: 300, desc: 'Instant calming.' },
      { name: 'Child Pose', breaths: 10, time: 300, desc: 'Stress release.' },
      { name: 'Grounding Pose', breaths: 10, time: 300, desc: 'Emotional stability.' },
      { name: 'Legs Up Wall', breaths: 10, time: 300, desc: 'Nervous system calm.' },
      { name: 'Box Breathing', breaths: 10, time: 300, desc: 'Anxiety control.' }
    ],
    Moderate: [
      { name: 'Alternate Nostril Breathing', breaths: 15, time: 600, desc: 'Balances mind.' },
      { name: 'Walking Meditation', breaths: 15, time: 600, desc: 'Reduces anxiety.' },
      { name: 'Body Scan Relaxation', breaths: 15, time: 600, desc: 'Deep relaxation.' },
      { name: 'Gentle Yoga Flow', breaths: 15, time: 600, desc: 'Stress release.' },
      { name: 'Mindful Journaling', breaths: 15, time: 600, desc: 'Emotional clarity.' }
    ],
    Advanced: [
      { name: 'Deep Silent Meditation', breaths: 20, time: 900, desc: 'Mental stillness.' },
      { name: 'Extended Breath Control', breaths: 20, time: 900, desc: 'Anxiety mastery.' },
      { name: 'Chakra Balancing', breaths: 20, time: 900, desc: 'Energy healing.' },
      { name: 'Yoga Nidra', breaths: 20, time: 900, desc: 'Deep subconscious relaxation.' },
      { name: 'Detachment Meditation', breaths: 20, time: 900, desc: 'Emotional control.' }
    ]
  },

  // ================= SLEEP =================
  
  

};

  // ================= INIT =================
  ngOnInit() {
    this.filteredCategories = this.categories;
    this.getTodayYoga();
  }

  // ================= CATEGORY =================
  openCategory(category: string) {
    this.selectedCategory = category;
  }

  changeLevel(level: string) {
    this.selectedLevel = level;
  }

  // ================= START YOGA =================
  startYoga(category: string) {

    const list = this.yogaExercises?.[category]?.[this.selectedLevel];

    if (!list || list.length === 0) return;

    this.selectedCategory = category;
    this.isYogaMode = true;
    this.currentAsanaIndex = 0;

    this.completedAsanas = 0;
    this.totalAsanas = list.length;

    this.loadAsana();
  }

  loadAsana() {

    const asana =
      this.yogaExercises[this.selectedCategory][this.selectedLevel][this.currentAsanaIndex];

    this.breaths = asana.breaths;
    this.timeLeft = asana.time;

    this.runTimer();
  }

  runTimer() {

    clearInterval(this.yogaTimer);

    this.yogaTimer = setInterval(() => {

      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.nextAsana();
      }

    }, 1000);
  }

  // ================= NEXT =================
  nextAsana() {

    this.completedAsanas++;

    const list =
      this.yogaExercises[this.selectedCategory][this.selectedLevel];

    if (this.currentAsanaIndex < list.length - 1) {

      this.currentAsanaIndex++;
      this.loadAsana();

    } else {

      this.finishYoga();
    }
  }

  // ================= PREVIOUS =================
  prevAsana() {

    if (this.currentAsanaIndex > 0) {

      this.currentAsanaIndex--;
      this.loadAsana();
    }
  }

  // ================= EXIT =================
  exitYoga() {

    this.isYogaMode = false;
    clearInterval(this.yogaTimer);
  }

  // ================= COMPLETE =================
  finishYoga() {

    this.isYogaMode = false;
    clearInterval(this.yogaTimer);

    if (this.completedAsanas >= this.totalAsanas) {

      const calories = this.totalAsanas * 10;
      const tokens = this.totalAsanas;

      this.fitness.calories += calories;
      this.fitness.tokens += tokens;

      const today = new Date().getDay();
      this.fitness.history[today] += calories;

      this.fitness.saveStats();
      this.fitness.saveHistory();

      alert(`🧘 Yoga Completed!
+${calories} Calories
+${tokens} Tokens`);
    }
  }

  // ================= RESET =================
  clearYogaData() {

    this.fitness.calories = 0;
    this.fitness.tokens = 0;
    this.fitness.history = [0,0,0,0,0,0,0];

    this.fitness.saveStats();
    this.fitness.saveHistory();

    alert('🧹 Yoga data cleared!');
  }
} 