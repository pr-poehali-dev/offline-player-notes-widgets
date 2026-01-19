import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  lyrics: string;
  note: string;
}

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState<Track>({
    id: 1,
    title: 'Neon Nights',
    artist: 'Synthwave Dreams',
    album: 'Digital Horizons',
    duration: '4:32',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    lyrics: `Verse 1:
В неоновом сиянии ночных огней
Танцуют тени прошлого и дней
Синтезаторы поют о мечтах
О будущем что в наших руках

Chorus:
Neon nights, electric dreams
Nothing's ever what it seems
Dancing through the digital sky
We were born to never die

Verse 2:
Пульсирует ритм сквозь провода
Музыка вечна как звезда
В этом мире из света и тьмы
Находим себя только мы`,
    note: ''
  });

  const [library] = useState<Track[]>([
    {
      id: 1,
      title: 'Neon Nights',
      artist: 'Synthwave Dreams',
      album: 'Digital Horizons',
      duration: '4:32',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
      lyrics: '',
      note: ''
    },
    {
      id: 2,
      title: 'Cyber Flow',
      artist: 'Digital Pulse',
      album: 'Future Sounds',
      duration: '3:45',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      lyrics: '',
      note: ''
    },
    {
      id: 3,
      title: 'Midnight Drive',
      artist: 'Retro Wave',
      album: 'Night Rider',
      duration: '5:12',
      cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop',
      lyrics: '',
      note: ''
    },
    {
      id: 4,
      title: 'Electric Dreams',
      artist: 'Neon City',
      album: 'Synth Paradise',
      duration: '4:08',
      cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
      lyrics: '',
      note: ''
    }
  ]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [progress, setProgress] = useState([30]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(currentTrack.title);
  const [editArtist, setEditArtist] = useState(currentTrack.artist);
  const [editCover, setEditCover] = useState(currentTrack.cover);
  const [trackNote, setTrackNote] = useState(currentTrack.note);
  const [activeTab, setActiveTab] = useState('player');

  const handleSaveEdit = () => {
    setCurrentTrack({
      ...currentTrack,
      title: editTitle,
      artist: editArtist,
      cover: editCover
    });
    setIsEditDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            NeoPlayer
          </h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-primary">
              <Icon name="Settings" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-secondary">
              <Icon name="Cloud" size={20} />
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-between p-8 pb-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          NeoPlayer
        </h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80">
            <Icon name="Settings" size={24} />
          </Button>
          <Button variant="ghost" size="icon" className="text-secondary hover:text-secondary/80">
            <Icon name="Cloud" size={24} />
          </Button>
        </div>
      </div>

      <div className="md:hidden pt-16 pb-28">
        {activeTab === 'player' && (
          <div className="p-4 space-y-6">
            <Card className="bg-card border-border overflow-hidden">
              <div className="relative aspect-square w-full p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl" />
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className="relative w-full h-full object-cover rounded-xl shadow-2xl neon-glow-cyan"
                />
              </div>

              <div className="p-6 space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-neon-cyan">{currentTrack.title}</h2>
                  <p className="text-lg text-neon-purple">{currentTrack.artist}</p>
                  <p className="text-sm text-muted-foreground">{currentTrack.album}</p>
                </div>

                <div className="space-y-2">
                  <Slider
                    value={progress}
                    onValueChange={setProgress}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1:22</span>
                    <span>{currentTrack.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <Button variant="ghost" size="icon" className="text-foreground">
                    <Icon name="Shuffle" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-foreground">
                    <Icon name="SkipBack" size={24} />
                  </Button>
                  <Button
                    size="icon"
                    className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary neon-glow-cyan"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    <Icon name={isPlaying ? 'Pause' : 'Play'} size={28} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-foreground">
                    <Icon name="SkipForward" size={24} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-foreground">
                    <Icon name="Repeat" size={20} />
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <Icon name="Volume2" size={18} className="text-muted-foreground" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground w-10 text-right">{volume[0]}%</span>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="Grid3x3" size={20} className="text-primary" />
                Виджеты
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4 bg-muted border-primary/30 hover:border-primary transition-colors">
                  <Icon name="Clock" size={28} className="text-primary mb-2 mx-auto" />
                  <p className="text-xs text-center">Последние</p>
                </Card>
                <Card className="p-4 bg-muted border-secondary/30 hover:border-secondary transition-colors">
                  <Icon name="TrendingUp" size={28} className="text-secondary mb-2 mx-auto" />
                  <p className="text-xs text-center">Популярное</p>
                </Card>
                <Card className="p-4 bg-muted border-accent/30 hover:border-accent transition-colors">
                  <Icon name="ListMusic" size={28} className="text-accent mb-2 mx-auto" />
                  <p className="text-xs text-center">Плейлисты</p>
                </Card>
                <Card className="p-4 bg-muted border-primary/30 hover:border-primary transition-colors">
                  <Icon name="Radio" size={28} className="text-primary mb-2 mx-auto" />
                  <p className="text-xs text-center">Радио</p>
                </Card>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'library' && (
          <div className="p-4">
            <Card className="bg-card border-border">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                    <Icon name="Music" size={20} className="text-primary" />
                    Все треки ({library.length})
                  </h3>
                  {library.map((track) => (
                    <Card
                      key={track.id}
                      className={`p-3 cursor-pointer transition-all ${
                        track.id === currentTrack.id ? 'bg-primary/10 border-primary' : 'bg-muted'
                      }`}
                      onClick={() => {
                        setCurrentTrack(track);
                        setActiveTab('player');
                      }}
                    >
                      <div className="flex gap-3">
                        <img
                          src={track.cover}
                          alt={track.title}
                          className="w-14 h-14 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{track.title}</p>
                          <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="outline" className="text-xs">{track.duration}</Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
        )}

        {activeTab === 'lyrics' && (
          <div className="p-4">
            <Card className="bg-card border-border p-6">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Icon name="FileText" size={20} className="text-secondary" />
                    Текст песни
                  </h3>
                  <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                    {currentTrack.lyrics || 'Текст песни недоступен'}
                  </div>
                </div>
              </ScrollArea>
            </Card>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="p-4">
            <Card className="bg-card border-border p-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Icon name="StickyNote" size={20} className="text-accent" />
                  Заметки к треку
                </h3>
                <Textarea
                  placeholder="Добавьте свои заметки о треке..."
                  className="min-h-[calc(100vh-350px)] bg-muted border-border"
                  value={trackNote}
                  onChange={(e) => setTrackNote(e.target.value)}
                />
                <Button className="w-full bg-gradient-to-r from-primary to-secondary neon-glow-cyan">
                  <Icon name="Save" size={18} className="mr-2" />
                  Сохранить заметку
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'edit' && (
          <div className="p-4">
            <Card className="bg-card border-border p-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Icon name="Edit" size={20} className="text-primary" />
                  Редактировать трек
                </h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Название</label>
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="bg-muted border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Исполнитель</label>
                  <Input
                    value={editArtist}
                    onChange={(e) => setEditArtist(e.target.value)}
                    className="bg-muted border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">URL обложки</label>
                  <Input
                    value={editCover}
                    onChange={(e) => setEditCover(e.target.value)}
                    className="bg-muted border-border"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => {
                      handleSaveEdit();
                      setActiveTab('player');
                    }}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary neon-glow-cyan"
                  >
                    <Icon name="Check" size={18} className="mr-2" />
                    Сохранить
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('player')}
                    className="flex-1"
                  >
                    Отмена
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <div className="hidden md:block p-8 pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card border-border overflow-hidden">
                <div className="relative aspect-square max-w-md mx-auto p-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl" />
                  <img
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    className="relative w-full h-full object-cover rounded-xl shadow-2xl neon-glow-cyan"
                  />
                </div>

                <div className="p-6 space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-neon-cyan">{currentTrack.title}</h2>
                    <p className="text-lg text-neon-purple">{currentTrack.artist}</p>
                    <p className="text-sm text-muted-foreground">{currentTrack.album}</p>
                  </div>

                  <div className="space-y-2">
                    <Slider
                      value={progress}
                      onValueChange={setProgress}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1:22</span>
                      <span>{currentTrack.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                      <Icon name="Shuffle" size={24} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                      <Icon name="SkipBack" size={28} />
                    </Button>
                    <Button
                      size="icon"
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary neon-glow-cyan hover:scale-105 transition-transform"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      <Icon name={isPlaying ? 'Pause' : 'Play'} size={32} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                      <Icon name="SkipForward" size={28} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                      <Icon name="Repeat" size={24} />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4">
                    <Icon name="Volume2" size={20} className="text-muted-foreground" />
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground w-12 text-right">{volume[0]}%</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary/10"
                      onClick={() => {
                        setEditTitle(currentTrack.title);
                        setEditArtist(currentTrack.artist);
                        setEditCover(currentTrack.cover);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Icon name="Edit" size={18} className="mr-2" />
                      Редактировать
                    </Button>
                    <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                      <Icon name="Heart" size={18} className="mr-2" />
                      В избранное
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="bg-card border-border p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Grid3x3" size={24} className="text-primary" />
                  Виджеты
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="p-4 bg-muted border-primary/30 hover:border-primary transition-colors cursor-pointer">
                    <Icon name="Clock" size={32} className="text-primary mb-2 mx-auto" />
                    <p className="text-sm text-center">Последние</p>
                  </Card>
                  <Card className="p-4 bg-muted border-secondary/30 hover:border-secondary transition-colors cursor-pointer">
                    <Icon name="TrendingUp" size={32} className="text-secondary mb-2 mx-auto" />
                    <p className="text-sm text-center">Популярное</p>
                  </Card>
                  <Card className="p-4 bg-muted border-accent/30 hover:border-accent transition-colors cursor-pointer">
                    <Icon name="ListMusic" size={32} className="text-accent mb-2 mx-auto" />
                    <p className="text-sm text-center">Плейлисты</p>
                  </Card>
                  <Card className="p-4 bg-muted border-primary/30 hover:border-primary transition-colors cursor-pointer">
                    <Icon name="Radio" size={32} className="text-primary mb-2 mx-auto" />
                    <p className="text-sm text-center">Радио</p>
                  </Card>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Tabs defaultValue="library" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-muted">
                  <TabsTrigger value="library">Библиотека</TabsTrigger>
                  <TabsTrigger value="lyrics">Текст</TabsTrigger>
                  <TabsTrigger value="notes">Заметки</TabsTrigger>
                </TabsList>

                <TabsContent value="library" className="mt-4">
                  <Card className="bg-card border-border">
                    <ScrollArea className="h-[600px]">
                      <div className="p-4 space-y-2">
                        <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                          <Icon name="Music" size={20} className="text-primary" />
                          Все треки ({library.length})
                        </h3>
                        {library.map((track) => (
                          <Card
                            key={track.id}
                            className={`p-3 cursor-pointer transition-all hover:border-primary ${
                              track.id === currentTrack.id ? 'bg-primary/10 border-primary' : 'bg-muted'
                            }`}
                            onClick={() => setCurrentTrack(track)}
                          >
                            <div className="flex gap-3">
                              <img
                                src={track.cover}
                                alt={track.title}
                                className="w-12 h-12 rounded object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{track.title}</p>
                                <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                              </div>
                              <div className="flex flex-col items-end justify-center">
                                <Badge variant="outline" className="text-xs">{track.duration}</Badge>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </Card>
                </TabsContent>

                <TabsContent value="lyrics" className="mt-4">
                  <Card className="bg-card border-border p-6">
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <Icon name="FileText" size={20} className="text-secondary" />
                          Текст песни
                        </h3>
                        <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                          {currentTrack.lyrics || 'Текст песни недоступен'}
                        </div>
                      </div>
                    </ScrollArea>
                  </Card>
                </TabsContent>

                <TabsContent value="notes" className="mt-4">
                  <Card className="bg-card border-border p-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Icon name="StickyNote" size={20} className="text-accent" />
                        Заметки к треку
                      </h3>
                      <Textarea
                        placeholder="Добавьте свои заметки о треке..."
                        className="min-h-[500px] bg-muted border-border"
                        value={trackNote}
                        onChange={(e) => setTrackNote(e.target.value)}
                      />
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary neon-glow-cyan">
                        <Icon name="Save" size={18} className="mr-2" />
                        Сохранить заметку
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border">
        <div className="grid grid-cols-5 gap-1 p-2">
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 h-auto py-2 ${activeTab === 'player' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('player')}
          >
            <Icon name="Play" size={20} />
            <span className="text-xs">Плеер</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 h-auto py-2 ${activeTab === 'library' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('library')}
          >
            <Icon name="Music" size={20} />
            <span className="text-xs">Треки</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 h-auto py-2 ${activeTab === 'lyrics' ? 'text-secondary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('lyrics')}
          >
            <Icon name="FileText" size={20} />
            <span className="text-xs">Текст</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 h-auto py-2 ${activeTab === 'notes' ? 'text-accent' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('notes')}
          >
            <Icon name="StickyNote" size={20} />
            <span className="text-xs">Заметки</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 h-auto py-2 ${activeTab === 'edit' ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => {
              setEditTitle(currentTrack.title);
              setEditArtist(currentTrack.artist);
              setEditCover(currentTrack.cover);
              setActiveTab('edit');
            }}
          >
            <Icon name="Edit" size={20} />
            <span className="text-xs">Редакт.</span>
          </Button>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Icon name="Edit" size={24} className="text-primary" />
              Редактировать трек
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Название</label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="bg-muted border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Исполнитель</label>
              <Input
                value={editArtist}
                onChange={(e) => setEditArtist(e.target.value)}
                className="bg-muted border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">URL обложки</label>
              <Input
                value={editCover}
                onChange={(e) => setEditCover(e.target.value)}
                className="bg-muted border-border"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleSaveEdit}
                className="flex-1 bg-gradient-to-r from-primary to-secondary neon-glow-cyan"
              >
                <Icon name="Check" size={18} className="mr-2" />
                Сохранить
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="flex-1"
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
